import { Facebook, Twitter, Linkedin, Youtube, Instagram } from "lucide-react"
import React, { useContext } from "react"
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
            <div className="flex w-1/2 flex-col items-center space-y-3">
              <img
                src="/public/logo.png"
                className="rounded-full"
                style={{ boxShadow: '0 8px 90px 60px rgba(255, 153, 51, 0.3)' }}
                alt="Logo"
              />
              <p className="text-center text-[#ff9933] italic max-w-xs">
                {t('Moto')}
              </p>
            </div>

          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-gray-300">
            <p>{t('address')}: {settings.location}</p>
            <p>{t('phone')}: {settings.line1}</p>
            <p>{t('email')}: {settings.email}</p>
            <div
              className="prose prose-lg w-64 h-32 overflow-clip"
              dangerouslySetInnerHTML={{ __html: settings.map_link }}
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
              <button className="w-full bg-[#FF9933] hover:bg-orange-500 px-4 py-2 rounded transition-colors">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 mt-8 pt-8 pr-20 flex flex-col md:flex-row justify-between items-center">
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
              <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 448 512"
      fill="currentColor"
      className="w-5 h-5"
    >
      <path d="M448,209.9V96h-66.7c-24.1,0-43.7-19.5-43.7-43.5V0H285v304.8c0,40.4-32.9,73.2-73.2,73.2s-73.2-32.9-73.2-73.2  c0-40.4,32.9-73.2,73.2-73.2c9.3,0,18,1.8,26.1,4.8V192c-8.6-1.2-17.4-2-26.1-2c-73.6,0-133.2,59.6-133.2,133.2  S138.3,456,211.9,456s133.2-59.6,133.2-133.2V176.1c19.5,11.6,42.1,18.2,66.7,18.2H448z"/>
    </svg>
            </a>

            <a href="https://t.me/ethiopianaii" className="text-gray-400 hover:text-orange-400 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0Zm58.9 83.22-22.18 104.2c-1.67 7.86-6.02 9.82-12.2 6.12l-33.77-24.93-16.3 15.7c-1.8 1.8-3.3 3.3-6.75 3.3l2.4-33.87 61.65-55.7c2.68-2.4-.6-3.75-4.17-1.35l-76.12 47.85-32.8-10.2c-7.13-2.22-7.3-7.13 1.5-10.53l127.96-49.35c5.92-2.25 11.1 1.35 9.22 10.25Z" />
              </svg>
            </a>
            <a href="https://wa.me/yourwhatsapplink" className="text-gray-400 hover:text-orange-400 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 32 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path d="M16 2.938c-7.283 0-13.188 5.905-13.188 13.188 0 2.25.585 4.45 1.697 6.398L2 30l7.65-2.484a13.084 13.084 0 0 0 6.35 1.61c7.283 0 13.188-5.905 13.188-13.188S23.283 2.938 16 2.938zm0 2c6.17 0 11.188 5.018 11.188 11.188 0 6.17-5.018 11.188-11.188 11.188-2.042 0-4.042-.54-5.8-1.563l-.406-.24-4.55 1.48 1.51-4.482-.27-.433a11.164 11.164 0 0 1-1.703-5.95C4.813 10.956 9.83 5.938 16 5.938zm-3.04 5.625a.937.937 0 0 0-.686.312l-1.69 1.84c-.262.278-.35.67-.23 1.025.005.01.005.02.012.03.335 1.203 1.003 2.333 1.88 3.21l.005.005c.87.87 1.987 1.535 3.183 1.87.01 0 .02 0 .03.01.355.12.748.03 1.025-.23l1.825-1.69a.937.937 0 0 0 .312-.687c0-.246-.1-.482-.28-.66l-1.125-1.125a.935.935 0 0 0-1.325 0l-.69.69a4.85 4.85 0 0 1-2.315-2.31l.69-.69a.935.935 0 0 0 0-1.325l-1.125-1.125a.935.935 0 0 0-.66-.28z" />
              </svg>
            </a>
          </div>


        </div>
      </div>
    </footer>
  )
}

export default Footer
