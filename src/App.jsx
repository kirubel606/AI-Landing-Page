import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Research from "./pages/Research"
import News from "./pages/News"
import Events from "./pages/Events"
import About from "./pages/About"
import Resources from "./pages/Resources"
import Contactus from "./pages/Contactus"
import "./App.css"
import SplashWrapper from './components/SplashWrapper';
import NewsDetail from "./pages/NewsDetail"

function App() {
  const location = useLocation(); // <-- This now works correctly

  return (
      <SplashWrapper >
        <main className="relative z-10">
          <Routes>
              <Route path="/Home" element={<Home />} />
              <Route path="/research" element={<Research />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/events" element={<Events />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resources />} />    
              <Route path="/contactus" element={<Contactus/>} />    
          </Routes>
        </main>
      </SplashWrapper>
  )
}

export default App
