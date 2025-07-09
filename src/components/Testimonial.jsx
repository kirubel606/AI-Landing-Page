"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useTranslation } from 'react-i18next'

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Testimonial = () => {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/quotes/testimonials/`);
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    const range = window.innerWidth < 768 ? 0 : window.innerWidth < 1024 ? 1 : 2;

    for (let i = -range; i <= range; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length;
      visible.push({
        ...testimonials[index],
        position: i,
      });
    }
    return visible;
  };

  // Touch/swipe handlers for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section className="py-8 md:py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12">
          {t('testimonial')}
        </h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft size={20} className="text-gray-600 md:w-6 md:h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight size={20} className="text-gray-600 md:w-6 md:h-6" />
          </button>

          {/* Testimonial Cards */}
          <div
            className="flex items-center justify-center space-x-2 md:space-x-4 overflow-hidden px-8 md:px-2"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {getVisibleTestimonials().map((testimonial, index) => {
              const isCenter = testimonial.position === 0;
              const isAdjacent = Math.abs(testimonial.position) === 1;
              const isEdge = Math.abs(testimonial.position) === 2;

              // ✅ Pick Amharic version if available
              const displayQuote = i18n.language === 'am' && testimonial.quote_am ? testimonial.quote_am : testimonial.quote;
              const displayName = i18n.language === 'am' && testimonial.name_am ? testimonial.name_am : testimonial.name;
              const displayTitle = i18n.language === 'am' && testimonial.title_am ? testimonial.title_am : testimonial.title;

              return (
                <div
                  key={`${testimonial.id}-${index}`}
                  className={`
                    transition-all duration-500 ease-in-out rounded-2xl p-3 md:p-4 shadow-lg flex-shrink-0
                    ${isCenter
                      ? "w-full max-w-sm md:w-80 h-56 md:h-64 opacity-100 scale-100 z-20 bg-gradient-to-br text-white from-indigo-950 to-indigo-600"
                      : isAdjacent
                        ? "hidden md:block md:w-64 md:h-56 opacity-80 scale-90 z-10 bg-gradient-to-br text-gray-800 from-orange-500 via-orange-300 to-orange-100"
                        : "hidden lg:block lg:w-48 lg:h-48 opacity-60 scale-75 z-0 text-gray-800"
                    }
                    ${isEdge ? "blur-sm text-gray-800 bg-orange-200" : ""}
                  `}
                >
                  <div className="h-full flex flex-col justify-between">
                    <blockquote
                      className={`
                        leading-relaxed mb-4 overflow-hidden
                        ${isCenter ? "text-sm md:text-base font-semibold" : "text-xs"}
                      `}
                    >
                      "{displayQuote}"
                    </blockquote>

                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.image || "/placeholder.svg?height=48&width=48"}
                        alt={displayName}
                        className={`rounded-full object-cover ${isCenter ? "w-10 h-10 md:w-12 md:h-12" : "w-8 h-8 md:w-10 md:h-10"
                          }`}
                      />
                      <div>
                        <p
                          className={`
                            font-semibold
                            ${isCenter ? "text-sm md:text-base font-bold text-white" : "text-gray-900 text-xs"}
                          `}
                        >
                          {displayName}
                        </p>
                        {displayTitle && (
                          <p
                            className={`
                              ${isCenter ? "text-xs md:text-sm text-blue-100" : "text-xs text-gray-600"}
                            `}
                          >
                            {displayTitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 md:mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>

          {/* Mobile swipe indicator */}
          <div className="md:hidden text-center mt-4">
            <p className="text-xs text-gray-500">{t('swipe_left_or_right')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
