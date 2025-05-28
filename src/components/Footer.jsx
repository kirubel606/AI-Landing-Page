import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"
import React,{useContext} from "react"
import { AppContext } from "../context/AppContext"

const Footer = () => {
  const { settings, loading } = useContext(AppContext)
  console.log("Here is Setting:",settings);
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div className="space-y-4 items-center justify-center flex">
            <div className="flex w-1/2 items-center space-x-3">
                <img src='/public/logo.png' className=" rounded-full" style={{ boxShadow: '0 8px 90px 60px rgba(255, 153, 51, 0.3)' }}/>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-gray-300">
              <p>Address: {settings.location}</p>
              <p>Phone: {settings.line1}</p>
              <p>Email: {settings.email}</p>
              <p>Location: <a href={settings.map_link}>Click Here</a></p>
            </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Research
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Publications
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Meet the developers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>


          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest research and developments</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-orange-500"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Ethiopian Artificial Intelligence Institute. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
