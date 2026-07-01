from __future__ import annotations
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from rag import RAGEngine

_rag: RAGEngine | None = None
_resume_path = os.path.join(os.path.dirname(__file__), "resume.txt")

_SYSTEM = (
    "You are a concise AI assistant on Kartik Bamble's portfolio. "
    "Answer based ONLY on the context below. Keep answers to 2-4 sentences. "
    "Never fabricate details not in the context. "
    "If the context does not contain enough information, say so honestly.\n\n"
    "CONTEXT FROM RESUME:\n{context}"
)


@asynccontextmanager
async def lifespan(_app: FastAPI):
    global _rag
    _rag = RAGEngine(_resume_path)
    yield


app = FastAPI(title="Kartik RAG API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://kartik117.github.io",
        "http://localhost:5173",
        "http://localhost:4173",
        "http://localhost:5184",
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

_groq = Groq(api_key=os.environ["GROQ_API_KEY"])


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    reply: str
    sources: list[str]


@app.get("/health")
def health():
    return {"status": "ok", "rag_ready": _rag is not None}


@app.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    if _rag is None:
        raise HTTPException(status_code=503, detail="RAG engine initialising")

    chunks = _rag.retrieve(req.message)
    context = "\n\n".join(chunks)

    messages = [
        {"role": "system", "content": _SYSTEM.format(context=context)},
        {"role": "user", "content": req.message},
    ]

    try:
        completion = _groq.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=messages,
            max_tokens=300,
            temperature=0.4,
        )
        return ChatResponse(
            reply=completion.choices[0].message.content,
            sources=chunks,
        )
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc)) from exc
