import { useState } from "react"
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"
import KAI from "./components/KAI"
import Kartik from "./components/Kartik"
import ContactModal from "./components/ContactModal"
import "./index.css"

const App = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <Router>
      <div className="min-h-screen text-slate-200 relative">
        <nav className="w-full px-8 py-4 flex justify-between items-center bg-slate-900 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 shadow-xl border-b border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-400">🤖</div>
            <span className="text-xl font-semibold text-blue-400">Portfolio</span>
          </div>
          <div className="flex items-center space-x-8 text-sm font-medium">
            <Link
              to="/"
              className="relative px-4 py-2 rounded-lg transition-all duration-300 text-slate-200 group kai-highlight"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
              <div className="absolute inset-0 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
              <span className="relative z-10 flex items-center space-x-1">
                <span className="text-blue-400 group-hover:animate-bounce">🤖</span>
                <span className="group-hover:text-blue-300 transition-colors duration-300">KAI</span>
              </span>
            </Link>
            <Link
              to="/kartik"
              className="px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:text-blue-300 text-slate-200"
            >
              Kartik
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-lg hover:bg-slate-800 transition-all duration-300 hover:text-blue-300 text-slate-200"
            >
              Contact
            </button>
          </div>
        </nav>

        <div className="pt-20">
          <Routes>
            <Route path="/" element={<KAI />} />
            <Route path="/kartik" element={<Kartik />} />
          </Routes>
        </div>

        {showModal && <ContactModal onClose={() => setShowModal(false)} />}
      </div>
    </Router>
  )
}

export default App
