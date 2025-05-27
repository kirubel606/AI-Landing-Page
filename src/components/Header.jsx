import { Link, useLocation } from "react-router-dom"
import logo from '../../public/logo.png'
const Header = () => {
  const location = useLocation()

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Research & Development", path: "/research" },
    { name: "News", path: "/news" },
    { name: "Events", path: "/events" },
    { name: "About Us", path: "/about" },
    { name: "Resource & Publications", path: "/resources" },
  ]

  return (
    <header className="relative z-10 px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <div className=" w-20 bg-white rounded-full flex items-center justify-center">
             <img src={logo} className=" rounded-full"/>
          </div>
        </Link>

        {/* Navigation Menu */}
        <div className=" bg-[#202024] border border-white/20 rounded-3xl px-3 py-2 shadow-2xl hidden lg:flex items-center space-x-8" style={{ boxShadow: '0 8px 10px 2px rgba(255, 153, 51, 0.15)' }}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`transition-colors duration-200 text-sm font-medium ${
                location.pathname === item.path ? "text-white bg-[#363639] rounded-3xl px-5 py-2" : "text-gray-300 hover:text-white px-1"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Get in Touch Button */}
        <button className="hidden lg:flex relative px-[3px] py-[3px] rounded-full text-white text-lg font-medium bg-[#202024] hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-200">
          {/* Gradient border layer */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-white to-orange-400 p-[1px]"></span>

          {/* Inner solid bg to create border effect */}
          <span className="relative block rounded-full bg-[#202024] px-6 py-2">
            Get in Touch
          </span>
        </button>

        {/* Mobile menu button */}
        <button className="lg:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  )
}

export default Header
