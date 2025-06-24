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

const Home = () => {
  const { news, gallery } = useContext(AppContext);
  const singleNews = news?.results?.result?.[0] || null;
  const singleGallery = gallery?.[0] || null;
  const navigate = useNavigate();

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
        <section className="flex items-center justify-center min-h-[80vh] px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* AI Badge */}
            <div className="inline-flex items-center bg-gray-800/50 border border-gray-700 rounded-full px-4 py-2 mb-8">
              {/* <RotatingText ... /> */}
              <span className="sm:px-2 md:px-3 bg-white text-black text-sm font-bold py-1 mr-2 rounded-lg">
                AI
              </span>
              <span className="text-gray-300 text-sm font-medium">FOR ALL</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white">Ethiopian Artificial</span>
              <br />
              <span className="text-orange-400">Intelligence Institute</span>
            </h1>

            {/* Description */}
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-3xl mx-auto">
              In 2030 to be a state-of-the-art National AI Research and Development Center with
              Excellence and Key Role in Creating Innovative AI-enabled solutions at national and
              international level.
            </p>

            {/* CTA Button */}
            <a href="/contactus">
              <button className="relative px-[3px] py-[3px] rounded-full text-white text-lg font-medium bg-[#202024] hover:border-gray-400 hover:bg-gray-700/50 transition-all duration-200">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-white to-orange-400 p-[1px]"></span>
                <span className="relative block rounded-full bg-[#202024] px-8 py-3">
                  Get in Touch
                </span>
              </button>
            </a>
          </div>
        </section>
      </div>

      {/* Social Media Links after scrolling past hero */}
      {showSocialLinks && <SocialMediaLinks />}

      {/* News Section */}
      {singleNews && singleNews.cover_image ? (
        <a className="cursor-pointer" onClick={() => navigate(`/news/${singleNews.id}`)}>
          <ContentSection
            title={singleNews.title}
            subtitle={singleNews.subtitle}
            images={[singleNews.cover_image, ...(singleNews.images || []).map(img => img.image)]}
            large={false}
          />
        </a>
      ) : (
        <p className="text-center text-white">No News Available</p>
      )}


      {/* Other Sections */}
      <ApplicationsGrid />
      <ProjectsGrid />
            {/* Gallery Section */}
      {singleGallery && singleGallery.images ? (
        <ContentSection
          title="Our Gallery"
          subtitle={singleGallery.title}
          images={(singleGallery.images || []).map(img => img.image)}
          large={true}
        />
      ) : (
        <p className="text-center text-white">No Gallery Available</p>
      )}

      <Quotes />
      <Testimonial />
      <Collaborations />
      {showSocialLinks && <ChatbotWrapper />}
      <Footer />
    </>
  );
};

export default Home;
