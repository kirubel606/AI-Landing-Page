// components/SocialMediaLinks.jsx
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const SocialMediaLinks = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-2/4 right-4 z-50 flex flex-col gap-6">
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
