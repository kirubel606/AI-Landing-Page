"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import logo from "../../public/logo.png"
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation()
  const [isSticky, setIsSticky] = useState(false)
  const [animateIn, setAnimateIn] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lang, setLang] = useState(i18n.language || 'en');
  useEffect(() => {
    // Set initial language state based on i18n
    setLang(i18n.language || 'en');
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/685e870e8b962e190cb8fc07/1iuojv4f4';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, [i18n.language]);
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };
  const navItems = [
    { name: t('home'), path: "/Home" },
    { name: t('news'), path: "/news" },
    { name: t('research'), path: "/research" },
    { name: t('resources'), path: "/resources" },
    { name: t('events'), path: "/events" },
    { name: t('about_us'), path: "/about" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // Reset mobile menu state when location changes
    setMobileMenuOpen(false);
    // Reset animateIn state when location changes
    setAnimateIn(false);
  }, [location]);
  // Animate sliding down only after isSticky turns true
  useEffect(() => {
    if (isSticky) {
      setAnimateIn(false);
      // Delay the animateIn toggle to trigger transition
      const timer = setTimeout(() => {
        setAnimateIn(true);
      }, 50); // 50ms delay
      return () => clearTimeout(timer);
    } else {
      setAnimateIn(false);
    }
  }, [isSticky]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "auto"
  }

  return (
    <header
      className={`z-10 px-6 py-4 w-full p-4 transition-transform duration-300 ease-in-out ${isSticky
          ? `fixed top-0 left-0 right-0 bg-gradient-to-b from-black/90 via-gray-800/60 to-transparent z-50 opacity-100 ${animateIn ? "translate-y-0" : "-translate-y-12"
          }`
          : "opacity-100 translate-y-0 fixed "
        }`}
    >

      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/Home" className="flex items-center">
          <div className="w-20 bg-white rounded-full flex items-center justify-center">
            <img src={logo || "/placeholder.svg"} className="rounded-full" />
          </div>
        </Link>

        {/* Navigation Menu */}
        <div
          className="bg-[#202024] border border-white/20 rounded-3xl px-3 py-2 shadow-2xl hidden lg:flex items-center space-x-8"
          style={{ boxShadow: "0 8px 10px 2px rgba(255, 153, 51, 0.15)" }}
        >
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`transition-colors duration-200 text-sm font-medium ${location.pathname.startsWith(item.path)
                  ? "text-white bg-[#363639] rounded-3xl px-5 py-2"
                  : "text-gray-300 hover:text-white px-1 py-2"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {/* Get in Touch Button */}
          <button
            className={`hidden lg:flex relative px-[3px] py-[3px] rounded-full text-white text-lg font-medium bg-[#202024] hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-200 ${isSticky ? "opacity-0 pointer-events-none" : "opacity-100 scale-100"}`}
          >
            {/* Gradient border layer */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-white to-orange-400 p-[1px]"></span>

            {/* Inner solid bg to create border effect */}
            <a href="/contactus">
              <span className="relative block rounded-full bg-[#202024] px-6 py-2">{t('contactus')}</span>
            </a>
          </button>

          <button
            onClick={toggleLanguage}
            className="inline py-2 px-4 rounded-full bg-gray-900  text-white border border-orange-500 hover:bg-orange-400 hover:text-white transition font-semibold shadow-md"
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'አማ' : 'EN'}
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden text-white z-50" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Full Screen Mobile Menu */}
        <div
          className={`fixed h-dvh inset-0 bg-black/95 backdrop-blur-md  lg:hidden flex flex-col justify-center items-center transition-all duration-500 ${mobileMenuOpen ? "opacity-100  visible" : "opacity-0  invisible"
            }`}
        >
          <div className="w-full  max-w-md px-6">
            {/* Mobile menu navigation items */}
            <div className="flex flex-col  space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={toggleMobileMenu}
                  className={`text-center text-xl font-medium transition-all duration-300 transform ${mobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                    } transition-delay-${index * 100} ${location.pathname === item.path
                      ? "text-white bg-[#363639] rounded-3xl px-5 py-3"
                      : "text-gray-300 hover:text-white hover:scale-105"
                    }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile Get in Touch Button */}
              <button
                className="relative px-[3px] py-[3px] rounded-full text-white text-lg font-medium bg-[#202024] hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-200 mt-8"
                style={{ transitionDelay: `${navItems.length * 50}ms` }}
              >
                {/* Gradient border layer */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-white to-orange-400 p-[1px]"></span>

                {/* Inner solid bg to create border effect */}
                <span className="relative block rounded-full bg-[#202024] px-6 py-2">{t('contactus')}</span>
              </button>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-orange-400/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Language Switcher */}
        {/* <div className="ml-4">
          <button onClick={() => i18n.changeLanguage('en')} className="text-white mr-2">EN</button>
          <button onClick={() => i18n.changeLanguage('am')} className="text-white">AM</button>
        </div> */}
      </nav>
    </header>
  )
}

export default Header
