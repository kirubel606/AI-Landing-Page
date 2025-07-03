import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const SocialMediaLinks = ({ visible = true }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');
useEffect(() => {
    // Set initial language state based on i18n
    setLang(i18n.language || 'en');
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/685e870e8b962e190cb8fc07/1iuojv4f4';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
  }, [i18n.language]);
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  if (!visible) return null;

  return (
    <div className="fixed z-10 right-4 top-[60%] -translate-y-1/2 flex flex-col items-center gap-3 md:right-6 lg:right-6">
      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 rounded-full bg-orange-400 text-white border border-orange-500 hover:bg-gray-900 hover:text-white transition font-semibold shadow-md"
        aria-label="Toggle language"
      >
        {lang === 'en' ? 'AM' : 'EN'}
      </button>

      {/* Social Media Icons */}
      <div className="flex flex-col gap-2">
        {[
          {
            href: "https://www.facebook.com/ArtificialIntelligenceInstituteOfficial",
            icon: <FaFacebookF />,
          },
          {
            href: "https://x.com/EthiopianAII",
            icon: <FaTwitter />,
          },
          {
            href: "http://www.linkedin.com/company/etartificialintelligenceinstitute",
            icon: <FaLinkedinIn />,
          },
          {
            href: "https://www.youtube.com/c/EthiopianArtificialIntelligenceInstitute",
            icon: <FaYoutube />,
          },
          // {
          //   href: "https://www.instagram.com/your_instagram_username", // Update this URL
          //   icon: <FaInstagram />,
          // },
          // {
          //   href: "https://www.tiktok.com/@your_tiktok_username", // Update this URL
          //   icon: <SiTiktok />,
          // },
        ].map(({ href, icon }, index) => (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 flex items-center justify-center rounded-full bg-orange-400 text-white border border-orange-500 hover:bg-gray-900 hover:text-white transition-all duration-200 shadow-md"
          >
            {icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaLinks;
