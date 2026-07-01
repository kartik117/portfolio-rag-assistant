from __future__ import annotations
import re
from sentence_transformers import SentenceTransformer
import chromadb

_MODEL_NAME = "all-MiniLM-L6-v2"
_CHUNK_SIZE = 350
_OVERLAP = 80


def _chunk(text: str) -> list[str]:
    paragraphs = [p.strip() for p in re.split(r"\n{2,}", text) if p.strip()]
    chunks: list[str] = []
    for para in paragraphs:
        if len(para) <= _CHUNK_SIZE:
            chunks.append(para)
        else:
            step = _CHUNK_SIZE - _OVERLAP
            for i in range(0, len(para), step):
                piece = para[i : i + _CHUNK_SIZE].strip()
                if piece:
                    chunks.append(piece)
    return chunks


class RAGEngine:
    def __init__(self, resume_path: str) -> None:
        self._model = SentenceTransformer(_MODEL_NAME)

        try:
            client = chromadb.EphemeralClient()
        except AttributeError:
            client = chromadb.Client()  # type: ignore[attr-defined]

        self._col = client.create_collection("resume")

        with open(resume_path) as f:
            text = f.read()

        chunks = _chunk(text)
        embeddings = self._model.encode(chunks, show_progress_bar=False).tolist()
        self._col.add(
            documents=chunks,
            embeddings=embeddings,
            ids=[f"c{i}" for i in range(len(chunks))],
        )

    def retrieve(self, query: str, k: int = 3) -> list[str]:
        embedding = self._model.encode([query], show_progress_bar=False).tolist()
        results = self._col.query(query_embeddings=embedding, n_results=k)
        return results["documents"][0]
