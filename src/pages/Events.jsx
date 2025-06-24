"use client";

import { useState, useEffect } from "react";
import CoolSvg from "../components/CoolSVg";
import Footer from "../components/Footer";
import { MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;

function Events() {
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
          <h2 className="text-2xl font-bold mb-2">Error Loading Events</h2>
          <p className="mb-4 text-gray-600">{error}</p>
          <button
            onClick={fetchEvents}
            className="bg-orange-500 text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="min-h-[40vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute w-full h-full">
          <CoolSvg />
        </div>
        <div className="relative h-full flex justify-center items-center text-center text-white">
          <div>
            <h1 className="text-5xl font-bold mb-4">Events</h1>
            <div className="w-20 h-1 bg-orange-400 mx-auto" />
          </div>
        </div>
      </div>

      <div className=" mx-auto px-6 md:px-32 py-16">
        {/* Upcoming & Live Events Section */}
        <div className="w-full mx-auto px-2 md:px-12 py-16">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No Events Found</h2>
              <p className="text-gray-600">Check back later for upcoming events.</p>
            </div>
          ) : (
            <div className="space-y-24">
              {upcomingEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                const daysLeft = calculateDaysLeft(event.timestamp);

                return (
                  <div
                    key={event.id}
                    className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8`}
                  >
                    {/* Event Info */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                          {formatDate(event.timestamp)}
                        </span>

                        {event.is_live ? (
                          <span className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                            <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                            <span>Is Going Live</span>
                          </span>
                        ) : (
                          daysLeft > 0 && (
                            <span className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                              <Clock size={14} />
                              <span>{daysLeft} Days Left</span>
                            </span>
                          )
                        )}
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h2>

                      <div className="flex items-center text-gray-600 mb-4">
                        <MapPin size={16} className="mr-2" />
                        <span>{event.location}</span>
                      </div>

                      <p className="text-gray-700 mb-6 line-clamp-4">{event.description}</p>

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
                              Watch Live
                            </>
                          ) : (
                            "Book Event"
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
          alt={event.title}
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

      {/* Thumbnail Row - same width as main image */}
      {event.images.length > 1 && (
        <div className="w-full">
          <div className="flex justify-between gap-2 overflow-x-auto">
            {event.images.slice(1, 4).map((img, i) => (
              <img
                key={i}
                src={img.image || PLACEHOLDER_IMAGE}
                alt={`event-img-${i}`}
                className="w-1/3 h-32 object-cover rounded-md"
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
              />
            ))}
          </div>
        </div>
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Past Events</h2>
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
                        alt={`${event.title} - image ${i + 1}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={PLACEHOLDER_IMAGE}
                      className="object-cover w-full h-full"
                      alt={event.title}
                    />
                  </div>
                )}


                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-sm text-gray-500 mb-2">{formatDate(event.timestamp)}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{event.title}</h3>
                  <div className="text-sm text-gray-600 mb-3 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {event.location}
                  </div>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3">{event.description}</p>

                  {event.video_link &&
                    (event.video_link.includes("youtube.com") || event.video_link.includes("youtu.be")) && (
                      <a
                        href={event.video_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-block text-sm font-medium text-indigo-600 hover:underline"
                      >
                        Watch Recap
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
                  className={`p-2 rounded-md ${currentPage === 1
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
                    className={`w-8 h-8 flex items-center justify-center rounded-md ${currentPage === i + 1
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
                  className={`p-2 rounded-md ${currentPage === totalPages
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