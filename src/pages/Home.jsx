import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationsGrid from "../components/ApplicationsGrid";
import Collaborations from "../components/Collaborations";
import ContentSection from "../components/ContentSection";
import CoolSvg from "../components/CoolSVg";
import Footer from "../components/Footer";
import ProjectsGrid from "../components/ProjectsGrid";
import Quotes from "../components/Quotes";
import Testimonial from "../components/Testimonial";
import SocialMediaLinks from "../components/SocialMediaLinks";
import { AppContext } from "../context/Appcontext";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Home = () => {
  const { gallery } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [sidebarNews, setSidebarNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sidebar news once on mount
  useEffect(() => {
    let mounted = true;
    const fetchSidebarNews = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/sidebar/`);
        const json = await res.json();
        const data = Array.isArray(json) ? json : [];
        const filteredData = data.filter((item) => !item.iframe && !item.magazine);
        if (mounted) setSidebarNews(filteredData);
      } catch (err) {
        console.error("Failed to fetch sidebar news:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchSidebarNews();
    return () => {
      mounted = false; // cleanup to avoid setting state on unmounted component
    };
  }, []);

  // Filter and get latest news with title in current language
  const singleNews = React.useMemo(() => {
    return (
      sidebarNews
        .filter((item) =>
          i18n.language === "am" ? item.title_am?.trim() : item.title?.trim()
        )
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0] || null
    );
  }, [sidebarNews, i18n.language]);

  const singleGallery = gallery?.[0] || null;

  const heroRef = useRef(null);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  // Intersection observer to toggle social media links visibility
  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowSocialLinks(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Navigate handler wrapped with useCallback for stability
  const handleNewsClick = useCallback(
    (id) => {
      navigate(`/news/${id}`);
    },
    [navigate]
  );

  return (
    <>
      {/* Hero Section */}
      <div ref={heroRef} className="min-h-screen bg-gray-900 relative overflow-hidden">
        <CoolSvg />
        <section className="flex items-center justify-center min-h-screen px-8 md:px-40">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl mt-28 md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              <span className="text-white">{t("home_heading1")}</span>
              <br />
              <span className="bg-gradient-to-r from-orange-500 via-white to-orange-500 bg-clip-text text-transparent">
                {t("home_heading2")}
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              {t("home_description")}
            </p>

            {/* AI Badge */}
            <div className="inline-flex items-center bg-gray-800/50 border border-[#FF9933] rounded-full px-4 py-2 mb-8">
              <span className="sm:px-2 md:px-3 px-1 bg-transparent text-white text-sm font-bold py-1 mr-2 rounded-lg">
                AI{t("for_all")}
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Social Media Links shown after scrolling past hero */}
      {showSocialLinks && <SocialMediaLinks />}

      {/* News Section */}
      {loading ? (
        <p className="text-center text-white">Loading news...</p>
      ) : sidebarNews.length > 0 ? (
        <div className="flex flex-col items-center justify-center max-w-6xl mx-auto px-4 py-6">
          <div className="w-16 h-1 bg-[#FF9933] mx-auto mb-8"></div>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("News")}</h2>
          </div>

          {/* Featured News */}
          <div
            className="w-full relative mb-4 cursor-pointer overflow-hidden rounded-xl shadow-xl"
            onClick={() => handleNewsClick(sidebarNews[0].id)}
          >
            <img
              src={sidebarNews[0].cover_image}
              alt={sidebarNews[0].title}
              loading="lazy"
              className="w-full h-[350px] object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 py-4">
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-extrabold drop-shadow-lg">
                {i18n.language === "am" ? sidebarNews[0].title_am : sidebarNews[0].title}
              </h2>
            </div>
          </div>

          {/* Other News */}
          {sidebarNews.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
              {sidebarNews.slice(1, 4).map((news) => (
                <div
                  key={news.id}
                  className="relative cursor-pointer overflow-hidden rounded-xl shadow-md transform transition duration-300 hover:scale-105"
                  onClick={() => handleNewsClick(news.id)}
                >
                  <img
                    src={news.cover_image}
                    alt={news.title}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-3">
                    <h3 className="text-white text-base font-semibold text-center drop-shadow-md">
                      {i18n.language === "am" ? news.title_am : news.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-white">{t("no_news_available")}</p>
      )}

      {/* Other Sections */}
      <ApplicationsGrid />
      <ProjectsGrid />

      {/* Gallery Section */}
      {singleGallery && singleGallery.images && singleGallery.images.length > 0 ? (
        <ContentSection
          title={t("our_gallery")}
          subtitle={i18n.language === "am" ? singleGallery.title_am : singleGallery.title}
          subsub={i18n.language === "am" ? singleGallery.discription_am : singleGallery.discription}
          images={singleGallery.images.map((img) => img.image)}
          large={true}
        />
      ) : (
        <p className="text-center text-white">{t("no_gallery_available")}</p>
      )}

      <Quotes />
      <Testimonial />
      <Collaborations />

      <Footer />
    </>
  );
};

export default Home;
