// components/SocialMediaLinks.jsx
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const SocialMediaLinks = ({ visible = true }) => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'am' : 'en';
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  if (!visible) return null;

  return (
    <div className="fixed top-2/4 right-4 z-50 flex flex-col gap-6 items-center">
      {/* Language Toggle */}
      <button
        onClick={toggleLanguage}
        className="mb-2 px-4 py-2 rounded-full bg-slate-900 text-white border border-orange-400 hover:bg-orange-400 hover:text-slate-900 transition font-semibold"
        aria-label="Toggle language"
      >
        {lang === 'en' ? 'AM' : 'EN'}
      </button>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
        className="bg-orange-400 hover:bg-white/20 backdrop-blur p-3 rounded-full text-white transition">
        <FaFacebookF />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
        className="bg-orange-400 hover:bg-white/20 backdrop-blur p-3 rounded-full text-white transition">
        <FaTwitter />
      </a>
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"
        className="bg-orange-400 hover:bg-white/20 backdrop-blur p-3 rounded-full text-white transition">
        <FaLinkedinIn />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"
        className="bg-orange-400 hover:bg-white/20 backdrop-blur p-3 rounded-full text-white transition">
        <FaYoutube />
      </a>
    </div>
  );
};

export default SocialMediaLinks;
