import { useState, useRef, useEffect } from 'react'

const API_URL = import.meta.env.VITE_RAG_API_URL || 'http://localhost:8000'

const WELCOME = {
  role: 'assistant',
  content:
    "Hi! I'm Kartik's AI portfolio assistant powered by RAG. I retrieve relevant chunks from his resume before answering — you can see exactly which chunks I used by expanding the Sources section below each reply.",
  sources: [],
}

function SourcesBlock({ sources }) {
  const [open, setOpen] = useState(false)
  if (!sources || sources.length === 0) return null
  return (
    <div className="sources">
      <button className="sources-toggle" onClick={() => setOpen(o => !o)}>
        {open ? '▾' : '▸'} Retrieved {sources.length} chunk{sources.length !== 1 ? 's' : ''} from vector store
      </button>
      {open && (
        <div className="sources-list">
          {sources.map((s, i) => (
            <div key={i} className="source-chunk">
              <span className="source-label">Chunk {i + 1}</span>
              <p>{s}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function App() {
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(m => [...m, { role: 'user', content: text }])
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMessages(m => [...m, {
        role: 'assistant',
        content: data.reply,
        sources: data.sources || [],
      }])
    } catch {
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'Connection error — the backend may be sleeping (Render free tier spins down after inactivity). Try again in 30 seconds.',
        sources: [],
      }])
    } finally {
      setLoading(false)
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <div className="header-title">
            <h1>Kartik Bamble</h1>
            <span className="rag-badge">RAG</span>
          </div>
          <a
            className="gh-link"
            href="https://github.com/kartik117/portfolio-rag-assistant"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub →
          </a>
        </div>
        <p className="header-sub">
          AI Portfolio Assistant — retrieves from a vector store, not a fixed prompt
        </p>
      </header>

      <div className="chat">
        {messages.map((msg, i) => (
          <div key={i} className={`msg msg-${msg.role}`}>
            {msg.role === 'assistant' && <div className="avatar">K</div>}
            <div className="bubble-wrap">
              <div className="bubble">{msg.content}</div>
              <SourcesBlock sources={msg.sources} />
            </div>
          </div>
        ))}
        {loading && (
          <div className="msg msg-assistant">
            <div className="avatar">K</div>
            <div className="bubble-wrap">
              <div className="bubble typing">
                <span /><span /><span />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Ask about Kartik's experience, skills, or projects…"
          disabled={loading}
        />
        <button onClick={send} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  )
}
