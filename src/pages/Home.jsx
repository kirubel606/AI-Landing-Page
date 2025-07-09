import ApplicationsGrid from "../components/ApplicationsGrid";
import Collaborations from "../components/Collaborations";
import ContentSection from "../components/ContentSection";
import CoolSvg from "../components/CoolSVg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProjectsGrid from "../components/ProjectsGrid";
import Quotes from "../components/Quotes";
import Testimonial from "../components/Testimonial";
import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/Appcontext";
import { useNavigate } from "react-router-dom";
import SocialMediaLinks from "../components/SocialMediaLinks";
// import RotatingText from '../components/RotatingText' // Uncomment if you use RotatingText
import ChatbotWrapper from "../components/ChatbotWrapper";
import { useTranslation } from 'react-i18next';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const Home = () => {
  const { gallery } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [sidebarNews, setSidebarNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSidebarNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/sidebar/`);
        const json = await res.json();
        const data = Array.isArray(json) ? json : [];
        const filteredData = data.filter(item => !item.iframe && !item.magazine);
        setSidebarNews(filteredData);
      } catch (err) {
        console.error("Failed to fetch sidebar news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSidebarNews();
  }, []);
  const singleNews = sidebarNews
    .filter(item =>
      i18n.language === 'am' ? item.title_am?.trim() : item.title?.trim()
    )
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null;

  const singleGallery = gallery?.[0] || null;


  const heroRef = useRef(null);
  const [showSocialLinks, setShowSocialLinks] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowSocialLinks(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <>
      {/* Hero Section with CoolSvg */}
      <div ref={heroRef} className="min-h-screen bg-gray-900 relative overflow-hidden">
        <CoolSvg />
        <section className="flex items-center justify-center min-h-screen px-40">
          <div className="text-center max-w-4xl mx-auto">
            

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="text-white">{t('home_heading1')}</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-white to-orange-500 bg-clip-text  text-transparent">
                {t('home_heading2')}
              </span>

            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              {t('home_description')}
            </p>

            {/* CTA Button */}
            {/* <a href="/contactus">
              <button className="relative px-[2px] py-[2px] rounded-full text-white text-lg font-medium bg-[#202024] hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-200">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-800 via-white to-orange-500 p-[0.3px]"></span>
                <span className="relative block rounded-full bg-[#202024] px-8 py-3">
                  {t('get_in_touch')}
                </span>
              </button>

            </a> */}
            {/* AI Badge */}
            <div className="inline-flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 mb-8">
              <span className="sm:px-2 md:px-3 px-1 bg-white text-black text-sm font-bold py-1 mr-2 rounded-lg">
                AI
              </span>
              <span className="text-gray-300 text-sm font-medium">{t('for_all')}</span>
            </div>
          </div>
        </section>

      </div>

      {/* Social Media Links after scrolling past hero */}
      {showSocialLinks && <SocialMediaLinks />}

      {/* News Section */}
      {loading ? (
        <p className="text-center text-white">Loading news...</p>
      ) : singleNews && singleNews.cover_image ? (
        <a onClick={() => navigate(`/news/${singleNews.id}`)} className="cursor-pointer">
          <ContentSection
            title={t('news')}
            subtitle={i18n.language === 'am' ? singleNews.title_am : singleNews.title}
            images={[singleNews.cover_image, ...(singleNews.images || []).map(img => img.image)]}
            large={false}
          />
        </a>
      ) : (
        <p className="text-center text-white">{t('no_news_available')}</p>
      )}

      {/* Other Sections */}
      <ApplicationsGrid />
      <ProjectsGrid />
      {/* Gallery Section */}
      {singleGallery && singleGallery.images ? (
        <ContentSection
          title={t('our_gallery')}
          subtitle={i18n.language === 'am' ? singleGallery.title_am : singleGallery.title}
          subsub={i18n.language === 'am' ? singleGallery.discription_am : singleGallery.discription}
          images={(singleGallery.images || []).map(img => img.image)}
          large={true}
        />
      ) : (
        <p className="text-center text-white">{t('no_gallery_available')}</p>
      )}

      <Quotes />
      <Testimonial />
      <Collaborations />
      {showSocialLinks}
      <Footer />
    </>
  );
};

export default Home;
