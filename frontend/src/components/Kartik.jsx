import { useEffect } from "react"
import AOS from "aos"
import "aos/dist/aos.css"

const projects = [
  {
    title: "Provenance — Multi-Agent Research Assistant",
    desc: "4-stage LangGraph pipeline (Search → Filter → Synthesis → Citation Verification) over academic papers. Citation-verification agent grounds every claim before surfacing it. Achieves RAGAS faithfulness 0.81.",
    link: "https://github.com/kartik117/provenance",
    color: "from-blue-600/20 to-slate-600/20",
    tech: ["Python", "LangGraph", "FastAPI", "Gemini", "Streamlit", "PostgreSQL", "Docker"],
  },
  {
    title: "RepoMind MCP — Codebase Intelligence",
    desc: "Parses GitHub repos via AST into a Neo4j knowledge graph (Function/Class/File nodes; CALLS/IMPORTS/INHERITS edges) and exposes it as an MCP server so Claude Desktop and Cursor can answer structural code questions.",
    link: "https://github.com/kartik117/repomind",
    color: "from-teal-600/20 to-slate-600/20",
    tech: ["Python", "TypeScript", "Neo4j", "FastAPI", "MCP SDK", "Docker", "GitHub Actions"],
  },
  {
    title: "MedFineTune — Medical LLM Fine-Tuning",
    desc: "QLoRA fine-tuning of Mistral-7B on clinical QA data (PubMedQA + MedQA) with 4-bit NF4 quantization (r=64, lora_alpha=128). Improved MedQA accuracy from 45% to 57%. Served via vLLM OpenAI-compatible endpoint.",
    link: "https://github.com/kartik117/medfinetune",
    color: "from-purple-600/20 to-slate-600/20",
    tech: ["PyTorch", "QLoRA", "vLLM", "Hugging Face", "PEFT"],
  },
  {
    title: "MedallionNYC — Medallion Lakehouse",
    desc: "Bronze/Silver/Gold lakehouse over 10M+ real NYC TLC taxi trip records. Orchestrated with Airflow, built on Delta Lake for ACID transactions and time travel. Quantified demand shifts post-2025 congestion pricing.",
    link: "https://github.com/kartik117/medallionnyc",
    color: "from-emerald-600/20 to-slate-600/20",
    tech: ["PySpark", "Delta Lake", "Airflow", "DuckDB", "Docker"],
  },
  {
    title: "PixelWave — Real-Time Collaborative Pixel Board",
    desc: "r/place-style shared 500×500 canvas. Go + gorilla/websocket fan-out through Redis BITFIELD (4-bit-per-pixel) and pub/sub. PostgreSQL as append-only replay log. Load-tested to 550 concurrent connections (~14ms broadcast latency).",
    link: "https://github.com/kartik117/pixelwave",
    color: "from-indigo-600/20 to-slate-600/20",
    tech: ["Go", "gorilla/websocket", "Redis", "PostgreSQL", "React", "Docker"],
  },
  {
    title: "HuntQuest — Real-Time Map-Based Scavenger Hunt",
    desc: "Teams walk to real Seattle landmarks; Redis GEOADD/GEOSEARCH marks checkpoints the instant a team enters the radius. Redis pub/sub fans updates across replicas. Kubernetes manifests verified on a local kind cluster.",
    link: "https://github.com/kartik117/huntquest",
    color: "from-cyan-600/20 to-slate-600/20",
    tech: ["FastAPI", "PostgreSQL", "Redis", "React", "Leaflet", "Kubernetes", "Jenkins"],
  },
]

const skills = [
  {
    category: "AI & Machine Learning",
    items: ["LangChain", "LangGraph", "RAG", "LangSmith", "RAGAS", "QLoRA", "vLLM", "XGBoost", "PyTorch", "TensorFlow", "FAISS", "ChromaDB", "sentence-transformers"],
    icon: "🧠",
    color: "from-blue-600/10 to-slate-700/10",
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS Lambda", "ECS Fargate", "SQS", "OpenSearch", "Bedrock", "S3", "Azure AKS", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    icon: "☁️",
    color: "from-teal-600/10 to-slate-700/10",
  },
  {
    category: "Backend Development",
    items: ["Python", "Go", "Java", "Node.js", "FastAPI", "Spring Boot", "gRPC", "REST APIs", "PostgreSQL", "Redis", "MongoDB", "SQL Server"],
    icon: "⚙️",
    color: "from-slate-600/10 to-blue-700/10",
  },
  {
    category: "Frontend & Data",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PySpark", "Delta Lake", "Airflow", "DuckDB"],
    icon: "🎨",
    color: "from-indigo-600/10 to-slate-700/10",
  },
  {
    category: "Observability & MLOps",
    items: ["LangSmith", "RAGAS", "MLflow", "CloudWatch", "Grafana", "Structured Logging"],
    icon: "📊",
    color: "from-emerald-600/10 to-slate-700/10",
  },
  {
    category: "Languages",
    items: ["Python", "Go", "Java", "JavaScript", "TypeScript", "SQL", "C++"],
    icon: "💻",
    color: "from-purple-600/10 to-slate-700/10",
  },
]

const Kartik = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true })
  }, [])

  return (
    <div className="w-full min-h-screen text-slate-200 p-6 relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto bg-slate-900/40 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-slate-700/50 space-y-12">
        {/* Profile */}
        <div className="flex flex-col items-center text-center" data-aos="fade-up">
          <div className="relative group mb-6">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 via-slate-600/20 to-teal-600/20 rounded-3xl blur opacity-40 group-hover:opacity-60 transition duration-500"></div>
            <img
              src={`${import.meta.env.BASE_URL}kartik.jpg`}
              alt="Kartik"
              className="relative w-48 h-60 rounded-3xl object-cover shadow-2xl border-2 border-slate-600/30 card-hover"
            />
          </div>
          <h1 className="text-5xl font-bold gradient-text mb-4">Kartik Bamble</h1>
          <p className="mt-2 text-lg max-w-2xl text-slate-300 leading-relaxed">
            AI/ML Engineer & Full-Stack Developer. M.S. Computer Science at Syracuse University (May 2026).
            Building intelligent systems that ship to production.
          </p>
        </div>

        {/* About */}
        <section data-aos="fade-up" className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/5 to-teal-600/5 rounded-3xl blur-xl"></div>
          <div className="relative bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30 professional-hover">
            <h2 className="text-4xl font-bold text-center gradient-text-accent mb-6">About Me</h2>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p className="text-lg">
                🎓 Pursuing my <strong className="text-slate-200">M.S. in Computer Science at Syracuse University</strong> (graduating May 2026), based in Redmond, WA.
                Previously a <strong className="text-blue-300">Systems Engineer at Tata Consultancy Services</strong>, where I worked on Java microservices,
                digital banking APIs, and AI-powered document pipelines.
              </p>
              <p className="text-lg">
                🤖 Most recently interned at the <strong className="text-slate-200">Commonwealth of Massachusetts (EOED)</strong> as an AI Engineer,
                building production RAG pipelines over MassHealth policy docs, an XGBoost urgency classifier for
                2M+ members, and an agentic document extraction system with AWS Bedrock + Textract.
              </p>
              <p className="text-slate-400 italic">
                I believe the best AI systems are ones that are grounded, measurable, and actually shipped — which is why
                every project I build includes evals (RAGAS, LangSmith) and real deployment infrastructure.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section data-aos="fade-up" data-aos-delay="100">
          <h2 className="text-4xl font-bold text-center gradient-text-accent mb-8">Technical Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className={`relative group bg-gradient-to-br ${skill.color} backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 card-hover professional-hover`}
                data-aos="fade-up"
                data-aos-delay={`${200 + index * 50}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="text-2xl float-animation" style={{ animationDelay: `${index * 0.2}s` }}>{skill.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-200 mb-3">{skill.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span key={item} className="px-3 py-1 text-xs bg-slate-700/40 text-slate-300 rounded-full border border-slate-600/30 hover:bg-slate-600/40 transition-colors duration-200">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section data-aos="fade-up" data-aos-delay="200">
          <h2 className="text-4xl font-bold text-center gradient-text-accent mb-8">Featured Projects</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative"
                data-aos="fade-up"
                data-aos-delay={`${300 + index * 100}`}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${project.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300`}></div>
                <div className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 p-6 rounded-2xl hover:border-slate-600/50 transition-all duration-300 card-hover professional-hover">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-slate-200 mb-2 group-hover:text-blue-300 transition-colors duration-300">{project.title}</h3>
                      <p className="text-slate-300 leading-relaxed mb-4">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs bg-slate-700/50 text-slate-400 rounded border border-slate-600/30">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="ml-4 text-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-300 float-animation">🔗</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 p-4 rounded-full bg-slate-800/80 backdrop-blur-sm text-slate-300 shadow-xl hover:shadow-blue-500/20 hover:scale-110 transition-all duration-300 z-50 border border-slate-600/30 hover:border-blue-500/50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}

export default Kartik
