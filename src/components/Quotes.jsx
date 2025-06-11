import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { LinkedinIcon } from "lucide-react";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AUTO_ADVANCE_DELAY = 5000; // 5 seconds

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}`+"/quotes/")
      .then((res) => setQuotes(res.data))
      .catch((err) => console.error("Failed to fetch quotes:", err));
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    // Clear any existing interval to avoid multiple intervals
    clearInterval(intervalRef.current);

    // Set up auto-advance interval
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % quotes.length);
    }, AUTO_ADVANCE_DELAY);

    // Cleanup on unmount
    return () => clearInterval(intervalRef.current);
  }, [quotes]);

  if (quotes.length === 0) return null; // or a loading spinner

  const quote = quotes[activeIndex];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Orange accent bar */}
        <div className="w-16 h-1 bg-white mx-auto mb-8"></div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quotes
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Leading voices in Ethiopian AI development share their insights
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700 rounded-lg shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src={quote.image || "/placeholder.svg"}
                alt={quote.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-orange-200"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <blockquote className="text-lg text-white mb-4 italic">
                "{quote.quote}"
              </blockquote>
              <div className="text-white ">
                <p className="font-bold text-lg">{quote.name}</p>
                <p className="text-gray-200">{quote.position}</p>
                {quote.link && (
                  <a href={quote.link} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon/>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {quotes.map((_, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show quote ${index + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3 h-3 bg-orange-500 scale-125"
                    : "w-3 h-3 bg-orange-300 hover:bg-orange-400"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Quotes;
