# 🤖 KAI — Kartik's AI Portfolio Assistant

![Backend](https://img.shields.io/badge/Backend-Render-blue?logo=render)
![Frontend](https://img.shields.io/badge/Frontend-GitHub%20Pages-black?logo=github)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![React](https://img.shields.io/badge/React-18-61dafb?logo=react)

An AI-powered portfolio assistant built with **Groq (Llama 3.3-70b)**, **sentence-transformers**, **ChromaDB**, and a full **RAG (Retrieval-Augmented Generation)** pipeline. Ask *KAI* about Kartik's experience, projects, or skills — it semantically retrieves the most relevant chunks from his resume before answering.

---

## 🌐 Live Demo

- **Frontend:** [kartik117.github.io/portfolio-rag-assistant](https://kartik117.github.io/portfolio-rag-assistant)

---

## ✨ Features

- 🤖 **Chat-based AI assistant** powered by Groq's Llama 3.3-70b-versatile (free tier)
- 📄 Resume parsed and chunked at startup from a local `resume.txt`
- 🧠 Semantic embeddings via `sentence-transformers` (all-MiniLM-L6-v2) — no API key needed
- 💾 ChromaDB in-memory vector store for fast retrieval
- 🔍 Top-3 relevant chunks retrieved per query and shown in the UI
- 🎨 Multi-page React app: **KAI** (chat) · **Kartik** (about + skills + projects) · **Contact**
- ✨ Animated neural-network background, typewriter effect, AOS scroll animations

---

## 🧰 Tech Stack

### Backend (`backend/`)
- `FastAPI` + `Uvicorn`
- `sentence-transformers` — `all-MiniLM-L6-v2` for free local embeddings
- `ChromaDB` — in-memory vector store
- `Groq` Python SDK — `llama-3.3-70b-versatile` for generation
- Hosted on **Render** (free tier)

### Frontend (`frontend/`)
- `React 18` + `Vite`
- `Tailwind CSS` for styling
- `react-router-dom` for multi-page routing
- `axios` for API calls
- `aos` for scroll animations
- Hosted on **GitHub Pages** via GitHub Actions

---

## 🧠 RAG Pipeline

```
resume.txt
    │
    ▼
Chunking (350-char chunks, 80-char overlap)
    │
    ▼
Embeddings (sentence-transformers all-MiniLM-L6-v2)
    │
    ▼
ChromaDB vector store (in-memory, built at startup)
    │
    ▼
Query → embed → top-3 similarity search → retrieved chunks
    │
    ▼
Groq (Llama 3.3-70b) answers using only retrieved context
```

1. `resume.txt` is loaded and split into overlapping chunks at startup
2. Each chunk is embedded using `all-MiniLM-L6-v2` (runs locally, no API key)
3. Embeddings are stored in a ChromaDB in-memory collection
4. On each `/chat` request, the query is embedded and top-3 chunks are retrieved
5. Retrieved chunks are injected as context into the Groq prompt
6. The frontend displays both the answer and the source chunks for full transparency

---

## 🔐 Environment Variables

### Backend (Render)
| Key | Description |
|---|---|
| `GROQ_API_KEY` | Groq API key from [console.groq.com/keys](https://console.groq.com/keys) |

### Frontend (GitHub Actions → GitHub Pages)
| Key | Description |
|---|---|
| `VITE_RAG_API_URL` | Render backend URL, e.g. `https://kartik-rag-api.onrender.com` |

---

## 🛠 Run Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # add your GROQ_API_KEY
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local  # set VITE_RAG_API_URL=http://localhost:8000
npm run dev
```

---

## 🚀 Deploy

### Backend → Render
1. New Web Service → connect this repo
2. **Root Directory:** `backend`
3. **Build Command:** `pip install -r requirements.txt && python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('all-MiniLM-L6-v2')"`
4. **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add env var: `GROQ_API_KEY`

### Frontend → GitHub Pages
1. Repo Settings → Pages → Source: **GitHub Actions**
2. Add repository variable: `VITE_RAG_API_URL` = your Render URL
3. Push to `main` — GitHub Actions builds and deploys automatically

---

## 👨‍💻 About

**Kartik Bamble** — AI/ML Engineer & Full-Stack Developer  
M.S. Computer Science, Syracuse University (May 2026) · Redmond, WA

🔗 [kartik117.github.io](https://kartik117.github.io) · [LinkedIn](https://linkedin.com/in/kartikbamble) · [GitHub](https://github.com/kartik117)

---

## 🙌 Credits

- 🤖 LLM powered by **[Groq](https://groq.com/)** — free tier, `llama-3.3-70b-versatile`
- 🧠 Embeddings by **[sentence-transformers](https://www.sbert.net/)** — `all-MiniLM-L6-v2`
- 💾 Vector storage by **[ChromaDB](https://www.trychroma.com/)**
- 🚀 Backend hosted on **[Render](https://render.com/)** · Frontend on **[GitHub Pages](https://pages.github.com/)**
