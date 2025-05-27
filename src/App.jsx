import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Research from "./pages/Research"
import News from "./pages/News"
import Events from "./pages/Events"
import About from "./pages/About"
import Resources from "./pages/Resources"
import "./App.css"

function App() {
  return (
    <Router>
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/news" element={<News />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
    </Router>
  )
}

export default App
