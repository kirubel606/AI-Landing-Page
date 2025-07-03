import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"
import React,{useContext} from "react"
import { AppContext } from "../context/Appcontext"
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const { settings, loading } = useContext(AppContext)
  
  // console.log("Here is Setting:",settings);
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-7">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Contact */}
          <div className="space-y-4 items-center justify-center flex">
            <div className="flex w-1/2 items-center space-x-3">
                <img src='/public/logo.png' className=" rounded-full" style={{ boxShadow: '0 8px 90px 60px rgba(255, 153, 51, 0.3)' }}/>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-gray-300">
              <p>{t('address')}: {settings.location}</p>
              <p>{t('phone')}: {settings.line1}</p>
              <p>{t('email')}: {settings.email}</p>
              <div
                className="prose prose-lg w-64 h-32 overflow-clip"
                dangerouslySetInnerHTML={{ __html: settings.map_link}}
              />
            </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('quick_links')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  {t('about_us')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  {t('research')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  {t('publications')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  {t('events')}
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Meet the developers
                </a>
              </li> */}
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  {t('careers')}
                </a>
              </li>
              <li>
                <a href="/gallery" className="hover:text-orange-400 transition-colors">
                  {t('gallery')}
                </a>
              </li>
            </ul>
          </div>


          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('newsletter')}</h3>
            <p className="text-gray-300 mb-4">{t('stay_updated')}</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder={t('enter_your_email')}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded focus:outline-none focus:border-orange-500"
              />
              <button className="w-full bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded transition-colors">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 {t('ethiopian_ai_institute')}. {t('all_rights_reserved')}
          </p>
<div className="flex space-x-4 mt-4 md:mt-0">
  <a href="https://www.facebook.com/ArtificialIntelligenceInstituteOfficial" className="text-gray-400 hover:text-orange-400 transition-colors">
    <Facebook size={20} />
  </a>
  <a href="https://x.com/EthiopianAII" className="text-gray-400 hover:text-orange-400 transition-colors">
    <Twitter size={20} />
  </a>
  <a href="http://www.linkedin.com/company/etartificialintelligenceinstitute" className="text-gray-400 hover:text-orange-400 transition-colors">
    <Linkedin size={20} />
  </a>
  <a href="https://www.youtube.com/c/EthiopianArtificialIntelligenceInstitute" className="text-gray-400 hover:text-orange-400 transition-colors">
    <Youtube size={20} />
  </a>
  <a href="https://www.instagram.com/ethiopianaii" className="text-gray-400 hover:text-orange-400 transition-colors">
    <Instagram size={20} />
  </a>
  <a href="https://www.tiktok.com/@ethiopianaii" className="text-gray-400 hover:text-orange-400 transition-colors">
    {/* TikTok icon as inline SVG */}
    <svg viewBox="0 0 256 256" width="20" height="20" fill="currentColor">
      <path d="M168 48V92a48 48 0 11-48 48V92h28a44 44 0 0044-44h-24z"/>
    </svg>
  </a>
</div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
