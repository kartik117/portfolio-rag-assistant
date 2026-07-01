import { useState, useRef, useEffect } from "react"
import axios from "axios"

const API_URL = import.meta.env.VITE_RAG_API_URL || "http://localhost:8000"

function KAI() {
  const [answer, setAnswer] = useState("")
  const [displayedAnswer, setDisplayedAnswer] = useState("")
  const [sources, setSources] = useState([])
  const [showSources, setShowSources] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const resultsRef = useRef(null)

  const sendMessage = async () => {
    if (!input.trim()) return
    setAnswer("")
    setDisplayedAnswer("")
    setSources([])
    setShowSources(false)
    setLoading(true)

    try {
      const res = await axios.post(`${API_URL}/chat`, { message: input })
      setAnswer(res.data.reply)
      setSources(res.data.sources || [])
    } catch {
      setAnswer("KAI hit a snag connecting to the backend. If this is the first request in a while, Render's free tier may be waking up — try again in 30 seconds.")
    } finally {
      setLoading(false)
      setInput("")
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage()
  }

  useEffect(() => {
    let i = 0
    setDisplayedAnswer("")
    if (answer) {
      const interval = setInterval(() => {
        setDisplayedAnswer((prev) => prev + answer.charAt(i))
        i++
        if (i >= answer.length) clearInterval(interval)
      }, 12)
      return () => clearInterval(interval)
    }
  }, [answer])

  return (
    <div className="w-full max-w-6xl mx-auto p-6 relative">
      <div className="matrix-rain"></div>
      <div className="ai-waves"></div>

      <div className="relative bg-slate-900/30 backdrop-blur-3xl rounded-3xl shadow-2xl p-8 border border-slate-700/40 overflow-hidden">
        {/* Decorative glow blobs */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-r from-emerald-500/8 to-teal-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/6 to-pink-500/6 rounded-full blur-xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>

        <div className="relative z-10 flex flex-col gap-10">
          {/* Profile summary */}
          <div className="flex flex-col lg:flex-row items-start gap-8 fade-in-up">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-slate-600/20 to-teal-600/20 rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
              <img
                src="/kartik.jpg"
                alt="Kartik"
                className="relative w-48 h-60 rounded-2xl object-cover shadow-xl border border-slate-600/30 card-hover"
              />
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold gradient-text mb-3">Kartik Bamble</h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  AI/ML Engineer & Full-Stack Developer passionate about building intelligent systems — RAG pipelines,
                  fine-tuned LLMs, and production-grade backends at scale.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 card-hover professional-hover">
                  <h2 className="font-bold text-lg text-blue-300 mb-3 flex items-center">
                    <span className="mr-2">🧠</span>Core Expertise
                  </h2>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li className="flex items-start">
                      <span className="text-blue-400 mr-2 mt-1">•</span>
                      <div><strong className="text-slate-200">AI/ML:</strong> RAG, LangGraph, QLoRA, RAGAS, Bedrock, XGBoost, vLLM</div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-400 mr-2 mt-1">•</span>
                      <div><strong className="text-slate-200">Backend:</strong> FastAPI, Go, Node.js, PostgreSQL, Redis, gRPC</div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-slate-400 mr-2 mt-1">•</span>
                      <div><strong className="text-slate-200">Cloud:</strong> AWS (ECS Fargate, Lambda, OpenSearch, Bedrock), Azure AKS, Kubernetes</div>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-800/20 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 card-hover professional-hover">
                  <h2 className="font-bold text-lg text-teal-300 mb-3 flex items-center">
                    <span className="mr-2">🚀</span>Featured Work
                  </h2>
                  <ul className="space-y-3 text-sm">
                    {[
                      { name: "Provenance", desc: "Multi-agent LangGraph research assistant", href: "https://github.com/kartik117/provenance" },
                      { name: "RepoMind MCP", desc: "Neo4j codebase intelligence MCP server", href: "https://github.com/kartik117/repomind" },
                      { name: "PixelWave", desc: "Real-time 500×500 collaborative pixel board", href: "https://github.com/kartik117/pixelwave" },
                    ].map((p) => (
                      <li key={p.name}>
                        <a href={p.href} target="_blank" rel="noopener noreferrer"
                          className="block p-3 rounded-lg bg-slate-700/15 hover:bg-slate-700/30 transition-all duration-300 border border-slate-600/20 hover:border-slate-500/40 group professional-hover">
                          <div className="font-semibold text-slate-200 group-hover:text-blue-300 transition-colors">{p.name}</div>
                          <div className="text-slate-400 text-xs mt-1">{p.desc}</div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Chat input */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-teal-600/20 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <input
                type="text"
                className="relative w-full p-5 rounded-2xl text-slate-200 bg-slate-800/40 backdrop-blur-sm focus:outline-none transition-all duration-300 placeholder:text-slate-400 border border-slate-600/30 focus:border-blue-500/50 focus:bg-slate-800/60"
                placeholder="I'm KAI — Kartik's AI assistant. Ask me about his experience, skills, or projects!"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={loading}
              className="relative px-8 py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed font-semibold professional-hover"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Retrieving…
                </span>
              ) : (
                "Ask KAI 🤖"
              )}
            </button>
          </div>

          {/* Answer display */}
          <div className="w-full max-w-4xl text-left space-y-4" ref={resultsRef}>
            {loading && (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mb-4"></div>
                  <div className="text-slate-300 professional-pulse">KAI is searching the vector store…</div>
                </div>
              </div>
            )}
            {!loading && displayedAnswer && (
              <>
                <div className="relative group fade-in-up">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/10 to-blue-600/10 rounded-2xl blur opacity-50"></div>
                  <div className="relative px-6 py-5 rounded-2xl bg-slate-800/50 backdrop-blur-sm text-slate-200 shadow-xl whitespace-pre-line border border-slate-600/30 card-hover">
                    <div className="flex items-start">
                      <div className="text-2xl mr-3 mt-1 float-animation">🤖</div>
                      <div className="flex-1 leading-relaxed">{displayedAnswer}</div>
                    </div>
                  </div>
                </div>

                {sources.length > 0 && (
                  <div className="fade-in-up">
                    <button
                      onClick={() => setShowSources((s) => !s)}
                      className="text-sm text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
                    >
                      {showSources ? "▾" : "▸"} Retrieved {sources.length} chunk{sources.length !== 1 ? "s" : ""} from vector store
                    </button>
                    {showSources && (
                      <div className="mt-3 space-y-3">
                        {sources.map((s, i) => (
                          <div key={i} className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4">
                            <span className="text-xs font-bold tracking-wider uppercase text-blue-400 block mb-2">Chunk {i + 1}</span>
                            <p className="text-slate-400 text-sm leading-relaxed">{s}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default KAI
