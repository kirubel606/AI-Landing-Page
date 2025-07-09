import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
  FaTelegramPlane
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const SocialMediaLinks = ({ visible = true }) => {


  if (!visible) return null;

  return (
    <div className="fixed z-10 right-4 top-[60%] -translate-y-1/2 flex flex-col items-center gap-3 md:right-6 lg:right-6">
      {/* Language Toggle Button */}


      {/* Social Media Icons */}
     <div className="flex flex-col gap-2">
  {[
        {
      href: "https://t.me/EthiopianAII", // Replace with your actual Telegram link
      icon: <FaTelegramPlane />,
    },
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
    //   href: "https://www.instagram.com/your_instagram_username",
    //   icon: <FaInstagram />,
    // },
    // {
    //   href: "https://www.tiktok.com/@your_tiktok_username",
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
