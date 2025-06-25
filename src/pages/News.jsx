"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CoolSvg from "../components/CoolSVg";
import Footer from "../components/Footer";
import Leftsidebar from "../components/News/Leftsidebar";
import RightSidebar from "../components/News/RightSidebar";
import CenterColumn from "../components/News/CenterColumn";
import MajorNews from "../components/News/MajorNews";
import debounce from 'lodash/debounce'; // Make sure you have lodash installed: npm install lodash
import SocialMediaLinks from "../components/SocialMediaLinks";
import { useTranslation } from 'react-i18next';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;

const PlayIcon = ({ size = "w-6 h-6" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21" fill="currentColor" />
  </svg>
);

const CalendarIcon = ({ size = "w-3 h-3" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

function News() {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [videoData, setVideoData] = useState([]);
  const [mergedContent, setMergedContent] = useState([]);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("latest");
  const addedItemIds = useRef(new Set());
  const observerTarget = useRef(null);
  const { t } = useTranslation();

  const getVideoThumbnail = (iframe, coverImage) => {
    const videoId = iframe?.match(/embed\/(.*?)\?/i)?.[1];
    if (!videoId) return `${BASE_URL}${coverImage || ""}`;

    // Try the best-quality thumbnail first
    return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  };


  const extractVideoDuration = () => "5:24"; // This is hardcoded; you might want to dynamically get this

  const navigateToDetail = (item) => navigate(`/news/${item.id}`);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMins = Math.floor((now - date) / 60000);
    if (diffMins < 1) return t('just_now');
    if (diffMins < 60) return `${diffMins} ${t('minutes_ago')}`;
    const hours = Math.floor(diffMins / 60);
    if (hours < 24) return `${hours} ${t('hours_ago')}`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} ${t('days_ago')}`;
    const weeks = Math.floor(days / 7);
    if (days < 30) return `${weeks} ${t('weeks_ago')}`;
    return `${Math.floor(days / 30)} ${t('months_ago')}`;
  };


  const pageRef = useRef(page);
  pageRef.current = page;

  // Debounced setter
  const debouncedSetPage = useCallback(
    debounce((nextPage) => {
      setPage(nextPage);
      pageRef.current = nextPage; // Update ref to stay in sync
    }, 300),
    []
  );

  const fetchContent = async (targetPage = pageRef.current) => {
    if (!targetPage) {
      console.warn("Page is undefined — skipping fetchContent");
      return;
    }

    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/news/all/?page=${targetPage}`);
      const json = await res.json();

      console.log(`Fetching page ${targetPage}`, json);

      const results = json?.results?.result;

      if (!results || results.length === 0) {
        setHasMore(false);
        return;
      }

      // Filter duplicates
      const newItems = results.filter((item) => !addedItemIds.current.has(item.id));
      newItems.forEach((item) => addedItemIds.current.add(item.id));

      const newMerged = newItems; // Already merged on backend


      // Append to merged content
      setMergedContent((prev) => [...prev, ...newItems]);


      // Set hasMore based on the `next` field from the response
      if (!json.next) {
        setHasMore(false);
      }

    } catch (err) {
      console.error("Error fetching content:", err);
      setError("Failed to fetch news data");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount and whenever page changes
  useEffect(() => {
    fetchContent();
  }, [page]);

  // IntersectionObserver
  useEffect(() => {
    if (!observerTarget.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {

          if (hasMore && !loading) {
            const nextPage = pageRef.current + 1;

            pageRef.current = nextPage; // update ref first
            debouncedSetPage(nextPage); // trigger actual state update (which triggers fetchContent)
          } else {
            console.log("No more pages to load or currently loading.");
          }
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    observer.observe(observerTarget.current);

    return () => {
      observer.disconnect();
      debouncedSetPage.cancel?.();
    };
  }, [hasMore, loading, debouncedSetPage]);


  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await fetch(`${BASE_URL}/news/all/`);
        const json = await res.json();
        const all = json?.results?.result || [];

        const news = all.filter((i) => !i.iframe);
        const videos = all.filter((i) => i.iframe);

        setNewsData(news);
        setVideoData(videos);

        // Add all item IDs to prevent duplication later
        // all.forEach((i) => addedItemIds.current.add(i.id));
      } catch (err) {
        setError("Initial fetch failed");
      }
    };
    fetchInitial();
  }, []);


  const renderSidebarContent = () => {
    const sorted =
      activeTab === "trending"
        ? [...newsData].sort((a, b) => b.view_count - a.view_count)
        : activeTab === "videos"
          ? [...videoData].sort((a, b) => b.view_count - a.view_count)
          : newsData;

    const badgeColor =
      activeTab === "trending"
        ? "bg-blue-100 text-blue-800"
        : activeTab === "videos"
          ? "bg-green-100 text-green-800"
          : "bg-orange-100 text-orange-800";

    return sorted.slice(0, 5).map((a) => (
      <div
        key={a.id}
        className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
        onClick={() => navigateToDetail(a)}
      >
        <div className="relative flex-shrink-0">
          <img
            src={activeTab === "videos" ? getVideoThumbnail(a.iframe, a.cover_image) : `${BASE_URL}${a.cover_image}`}
            alt={a.title}
            onError={(e) => {
              e.target.src = PLACEHOLDER_IMAGE;
            }}
            className="w-20 h-20 object-cover rounded-lg"
          />

          {activeTab === "videos" && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-400 rounded-full text-white flex items-center justify-center">
                  <PlayIcon size="w-3 h-3" />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {extractVideoDuration(a.iframe)}
              </div>
            </>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs mb-2 px-2 py-1 rounded ${badgeColor}`}>{a.category}</span>
          <h4 className="text-sm font-medium leading-tight mb-2 line-clamp-3">{a.title}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon size="w-2.5 h-2.5" />
            <span className="ml-1">{formatDate(a.created_at)}</span>
          </div>
        </div>
      </div>
    ));
  };

  const featuredArticle = [...newsData].sort((a, b) => b.view_count - a.view_count)[0];
  const majorNews = newsData.find((n) => n.category === "Healthcare") || newsData[newsData.length - 1];
  if (loading && page === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">Loading initial content...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-[30vh] md:min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <CoolSvg />
        <div className="relative h-64 mx-20 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-6xl font-bold mb-4">{t('news_and_videos')}</h1>
            <p className="text-xl">{t('advancing_innovation_through_technology')}</p>
          </div>
        </div>
      </div>

      <main className="max-w-[90%] mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          <Leftsidebar {...{ leftColumnNews: newsData, BASE_URL, CalendarIcon, formatDate, navigateToDetail }} />
          <CenterColumn {...{ featuredArticle, BASE_URL, techNews: newsData, CalendarIcon, formatDate, navigateToDetail }} />
          <RightSidebar {...{ activeTab, setActiveTab, renderSidebarContent }} />
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* <h2 className="text-3xl font-bold mb-8 text-center">Tech News & Videos</h2> */}
        <div className="space-y-8">
                      <SocialMediaLinks />
          {mergedContent.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg"
              onClick={() => navigateToDetail(item)}
            >
              {item.iframe ? (
                <>
                  <div className="relative">
                    <img
                      src={getVideoThumbnail(item.iframe, item.cover_image)}
                      alt={item.title}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-orange-400 hover:bg-[#080a24af] text-white rounded-full flex items-center justify-center">
                        <PlayIcon size="w-8 h-8" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-2 py-1 rounded">
                      {extractVideoDuration(item.iframe)}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.subtitle}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{item.view_count} views</span>
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                  </div>
                </>
              ) : (
                <MajorNews
                  majorNews={item}
                  BASE_URL={BASE_URL}
                  PlayIcon={PlayIcon}
                  CalendarIcon={CalendarIcon}
                  formatDate={formatDate}
                  navigateToDetail={navigateToDetail}
                />
              )}
            </div>
          ))}
        </div>

        <div ref={observerTarget} className="py-4 text-center">
          {loading && page > 1 && (
            <div className="flex justify-center">
              <svg className="animate-spin h-6 w-6 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          )}
          {!hasMore && <p>{t('you_ve_reached_the_end_of_the_content')}</p>}
        </div>


      </section>

      {/* <Footer /> */}
    </div>
  );
}

export default News;