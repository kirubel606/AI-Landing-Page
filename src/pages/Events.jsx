"use client";

import { useState, useEffect, useRef } from "react";
import CoolSvg from "../components/CoolSVg";
import Footer from "../components/Footer";
import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;
import SocialMediaLinks from "../components/SocialMediaLinks";

function EventImagesCarousel({ images }) {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [carouselImages, setCarouselImages] = useState(images);

  useEffect(() => {
    setCarouselImages(images);
  }, [images]);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (carouselImages.length <= 1) return;

    const scrollContainer = scrollRef.current;
    const scrollStep = 1; // pixels per frame
    let animationFrameId;

    const step = () => {
      if (!isPaused && scrollContainer) {
        // Scroll horizontally by scrollStep pixels
        scrollContainer.scrollLeft += scrollStep;

        // If we've scrolled past width of first image, rotate images
        const firstImage = scrollContainer.children[0];
        if (firstImage) {
          const firstImageWidth = firstImage.offsetWidth + parseInt(getComputedStyle(firstImage).marginRight || 0);

          if (scrollContainer.scrollLeft >= firstImageWidth) {
            // Move first image to the end
            setCarouselImages((imgs) => {
              const newImgs = [...imgs];
              const first = newImgs.shift();
              newImgs.push(first);
              return newImgs;
            });
            // Reset scrollLeft by subtracting first image width
            scrollContainer.scrollLeft -= firstImageWidth;
          }
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, carouselImages]);

  if (!carouselImages || carouselImages.length <= 1) return null;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex w-full justify-start gap-2 overflow-x-hidden" // hide scrollbar
        style={{ scrollBehavior: "auto" }}
      >
        {carouselImages.map((img, i) => (
          <img
            key={i}
            src={img.image || PLACEHOLDER_IMAGE}
            alt={`event-img-${i}`}
            className="w-1/3 h-32 object-cover rounded-md flex-shrink-0"
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER_IMAGE;
            }}
            draggable={false}
          />
        ))}
      </div>
    </div>
  );
}


function Events() {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/events/`);
      const data = await response.json();
      if (data) setEvents(data);
    } catch (err) {
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}, ${date.getFullYear()}`;
  };

  const now = new Date();
  const upcomingEvents = events.filter(
    (event) =>
      event.is_live ||
      (event.status?.toLowerCase() === "upcoming" && new Date(event.end_date) >= now)
  );

  const pastEvents = events.filter(
    (event) =>
      !event.is_live &&
      event.status?.toLowerCase() === "upcoming" &&
      new Date(event.end_date) < now
  );

  const calculateDaysLeft = (dateString) => {
    const today = new Date();
    const eventDate = new Date(dateString);
    const diff = eventDate - today;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? daysLeft : 0;
  };

  const totalPages = Math.ceil(pastEvents.length / eventsPerPage);
  const paginatedPastEvents = pastEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin w-10 h-10 border-b-2 border-orange-500 rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">{t("error_loading_events")}</h2>
          <p className="mb-4 text-gray-600">{t("failed_to_fetch_events")}</p>
          <button
            onClick={fetchEvents}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            {t("try_again")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="min-h-[30vh] md:min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-dvh w-full">
          <CoolSvg />
        </div>

        <div className="relative h-64 bg-transparent mx-20">
          <div className="z-20 flex items-center justify-center h-full">
            <div className="text-center text-white h-full">
              <h1
                variant="h1"
                className="text-5xl md:text-6xl flex font-bold mt-36 mb-2 text-white"
              >
                {t("events")}
              </h1>
            </div>
          </div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
      </div>
      <SocialMediaLinks />
      <div className="mx-auto px-6 md:px-32 py-16">
        {/* Upcoming & Live Events Section */}
        <div className="w-full mx-auto px-2 md:px-12 py-16">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("no_events_found")}</h2>
              <p className="text-gray-600">{t("check_back_later")}</p>
            </div>
          ) : (
            <div className="space-y-24">
              {upcomingEvents
                .filter((item) =>
                  i18n.language === "am" ? item.title_am?.trim() : item.title?.trim()
                )
                .map((event, index) => {
                  const isEven = index % 2 === 0;
                  const daysLeft = calculateDaysLeft(event.timestamp);

                  return (
                    <div
                      key={event.id}
                      className={`flex flex-col ${
                        isEven ? "md:flex-row" : "md:flex-row-reverse"
                      } gap-8`}
                    >
                      {/* Event Info */}
                      <div className="md:w-1/2 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                            {formatDate(event.timestamp)}
                          </span>

                          {event.is_live ? (
                            <span className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                              {t("is_going_live")}
                            </span>
                          ) : (
                            daysLeft > 0 && (
                              <span className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                                <Clock size={14} />
                                <span>
                                  {daysLeft} {t("days_left")}
                                </span>
                              </span>
                            )
                          )}
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold mb-4">
                          {i18n.language === "am" ? event.title_am : event.title}
                        </h2>

                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin size={16} className="mr-2" />
                          <span>{event.location}</span>
                        </div>

                        <p className="text-gray-700 mb-6 line-clamp-4">
                          {i18n.language === "am"
                            ? event.description_am
                            : event.description}
                        </p>

                        <div className="flex items-center gap-4">
                          <a
                            href={event.video_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                          >
                            {event.is_live ? (
                              <>
                                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                {t("watch_live")}
                              </>
                            ) : (
                              t("book_event")
                            )}
                          </a>
                        </div>
                      </div>

                      {/* Event Images */}
                      <div className="md:w-1/2">
                        {event.images && event.images.length > 0 && (
                          <>
                            {/* Main Image */}
                            <div className="relative rounded-lg overflow-hidden shadow-lg mb-4">
                              <img
                                src={event.images[0].image || PLACEHOLDER_IMAGE}
                                alt={
                                  i18n.language === "am"
                                    ? event.title_am
                                    : event.title
                                }
                                className="w-full h-80 object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                                }}
                              />
                              {event.is_live && (
                                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                                  LIVE
                                </div>
                              )}
                            </div>

                            {/* Thumbnail Row - slideshow */}
                            {event.images.length > 1 && (
                              <EventImagesCarousel
                                images={event.images.slice(0, 4)}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Past Events Grid */}
        <div className="container justify-center px-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            {t("past_events")}
          </h2>
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {event.images && event.images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1 p-1 rounded-t-lg">
                    {event.images.slice(0, 4).map((img, i) => (
                      <img
                        key={i}
                        src={img.image || PLACEHOLDER_IMAGE}
                        onError={(e) => {
                          e.currentTarget.src = PLACEHOLDER_IMAGE;
                        }}
                        className="object-cover w-full h-28 rounded-md"
                        alt={`${
                          i18n.language === "am" ? event.title_am : event.title
                        } - image ${i + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={PLACEHOLDER_IMAGE}
                      className="object-cover w-full h-full"
                      alt={i18n.language === "am" ? event.title_am : event.title}
                    />
                  </div>
                )}

                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-sm text-gray-500 mb-2">
                    {formatDate(event.timestamp)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {i18n.language === "am" ? event.title_am : event.title}
                  </h3>
                  <div className="text-sm text-gray-600 mb-3 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {event.location}
                  </div>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                    {i18n.language === "am"
                      ? event.description_am
                      : event.description}
                  </p>

                  {event.video_link &&
                    (event.video_link.includes("youtube.com") ||
                      event.video_link.includes("youtu.be")) && (
                      <a
                        href={event.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-block text-sm font-medium text-indigo-600 hover:underline"
                      >
                        {t("watch_recap")}
                      </a>
                    )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16">
              <nav className="flex items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronLeft size={16} />
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${
                      currentPage === i + 1
                        ? "bg-indigo-900 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <ChevronRight size={16} />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Events;
