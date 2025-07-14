import React, { useEffect, useState, useRef, memo } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProjectsGrid = memo(() => {
  const { t, i18n } = useTranslation();
  const [projects, setProjects] = useState([]);

  // refs for navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // workaround for swiper navigation ref issue:
  // navigation prevEl/nextEl needs to be assigned after refs are attached
  const [navReady, setNavReady] = React.useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/rnd/`);
        const validProjects = response.data.filter((project) =>
          i18n.language === "am"
            ? project.title_am?.trim()
            : project.title?.trim()
        );
        setProjects(validProjects);
      } catch (error) {
        console.error("Failed to fetch R&D projects:", error);
      }
    };

    fetchProjects();
  }, [i18n.language]);

  useEffect(() => {
    // Delay setting navReady until refs are attached
    setNavReady(true);
  }, []);

  return (
    <section className="pt-8 pb-px bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("some_of_our_projects")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("building_the_future")}</p>
        </div>

        <div className="relative max-w-6xl mx-auto perspective-[1200px]">
          <Swiper
            modules={[Autoplay, Navigation, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            effect="coverflow"
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 250,
              modifier: 1.2,
              slideShadows: false,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={
              navReady
                ? {
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }
                : false
            }
            onInit={(swiper) => {
              if (navReady) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
            className="pb-12 fancy-swiper"
          >
            {projects.map((project) => {
              const title = i18n.language === "am" ? project.title_am : project.title;
              const description =
                i18n.language === "am" ? project.description_am : project.description;
              const truncatedDesc =
                description
                  ?.split(" ")
                  .slice(0, 20)
                  .join(" ") + (description?.split(" ").length > 20 ? "..." : "");

              return (
                <SwiperSlide
                  key={project.id}
                  className="relative mb-28 transition-transform duration-500 ease-in-out"
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <a
                      href="/research"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-[90%] h-full bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.05]"
                    >
                      <div className="relative w-full h-60 overflow-hidden">
                        <img
                          src={project.coverimage || "/placeholder.svg"}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          style={{ minHeight: "240px" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {project.logo && (
                          <img
                            src={project.logo}
                            alt={`${title} logo`}
                            className="absolute top-44 right-6 w-16 rounded-full border-2 border-white shadow-md object-cover bg-white p-1"
                          />
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors duration-300">
                          {title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{truncatedDesc}</p>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Nav buttons */}
          <div
            ref={prevRef}
            className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-100 cursor-pointer z-10"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </div>
          <div
            ref={nextRef}
            className="absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer z-10"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Fancy slide active effect */}
      <style>{`
        .fancy-swiper .swiper-slide {
          transition: transform 0.6s ease, filter 0.6s ease;
        }
        .fancy-swiper .swiper-slide:not(.swiper-slide-active) .fancy-overlay {
          background: transparent;
          backdrop-filter: blur(1px);
        }
        .fancy-swiper .swiper-slide-active {
          transform: scale(1.1);
          z-index: 10;
        }
      `}</style>
    </section>
  );
});

export default ProjectsGrid;
