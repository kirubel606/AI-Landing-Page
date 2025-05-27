import { Link, useLocation } from "react-router-dom"

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
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          </div>
        </Link>

        {/* Navigation Menu */}
        <div className=" bg-[#202024] border border-white/20 rounded-3xl px-8 py-4 shadow-2xl hidden lg:flex items-center space-x-8" style={{ boxShadow: '0 8px 10px 2px rgba(255, 153, 51, 0.15)' }}>
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`transition-colors duration-200 text-sm font-medium ${
                location.pathname === item.path ? "text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Get in Touch Button */}
        <button className="bg-transparent border border-gray-600 text-white px-6 py-2 rounded-full hover:border-gray-400 transition-colors duration-200 text-sm font-medium">
          Get in Touch
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
