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
import { FiFilter ,FiSearch } from "react-icons/fi";    
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
const [magazineData, setMagazineData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("trending");
  const addedItemIds = useRef(new Set());
  const observerTarget = useRef(null);
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");       // the selected category filter
  const [filterCategory, setFilterCategory] = useState(category);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [newsType, setNewsType] = useState("all");  // "all" | "regular" | "magazine" | "video"
  const [categories, setCategories] = useState([]);   // the list of all categories
  const [searchTerm, setSearchTerm] = useState("");
  const panelRef = useRef();


  // Fetch categories on mount
  useEffect(() => {
    fetch(`${BASE_URL}/categories/`)
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch(console.error);
  }, []);
  

  // Close when clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

// Whenever the user picks a new category, restart from page 1 AND refetch immediately
useEffect(() => {
  addedItemIds.current.clear();
  setMergedContent([]);
  setNewsData([]);   // if you also want to reset the newsData array
  setHasMore(true);

  // Force page ref to 1
  pageRef.current = 1;
  setPage(1);

  // Immediately fetch page 1 with the new category
  fetchContent(1);
}, [category]);
const runSearch = () => {
  // Prevent useless fetch if already empty and we’re on page 1
  if (searchTerm.trim() === "" && pageRef.current === 1 && mergedContent.length > 0) {
    return;
  }

  addedItemIds.current.clear();
  setMergedContent([]);
  setNewsData([]);
  pageRef.current = 1;
  setPage(1);
  setHasMore(true);

  fetchContent(1);
};
useEffect(() => {
  if (searchTerm.trim() === "") {
    runSearch();
  }
}, [searchTerm]);

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
      // Build the query string
      const params = new URLSearchParams();
      params.set("page", targetPage);
      if (category) {
        params.set("category", category);
      }
      // date range
      if (dateFrom) params.set("date_from", dateFrom);
      if (dateTo)   params.set("date_to",   dateTo);
      if (searchTerm) params.set("search", searchTerm); // <-- Add this line
      // type
      switch (newsType) {
        case "regular":
          params.set("magazine", "false");
          params.set("iframe",   "false");
          break;
        case "magazine":
          params.set("magazine", "true");
          break;
        case "video":
          params.set("iframe",   "true");
          break;
        // "all" → no extra params
      }

      // Add any other params here, e.g. params.set("author", authorId);

      const url = `${BASE_URL}/news/all/?${params.toString()}`;
      const res = await fetch(url);
      const json = await res.json();
      if (json.message){
        setError(json.message);
      }
      else{
        setError(null);
      }
      const results = json?.results?.result;

      if (!results || results.length === 0) {
        setHasMore(false);
        return;
      }

      // Filter duplicates
      const newItems = results.filter((item) => !addedItemIds.current.has(item.id));
      newItems.forEach((item) => addedItemIds.current.add(item.id));

      // Append to merged content
      setNewsData((prev) => [...prev, ...newItems])
      setMergedContent((prev) => [...prev, ...newItems]);

      // Set hasMore based on the `next` field from the response
      if (!json.next) {
        setHasMore(false);
      }

    } catch (err) {
      console.error("Error fetching content:", err);
      setError(err.message || "Failed to fetch news data");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  const fetchMagazines = async () => {
    try {
      const res = await fetch(`${BASE_URL}/news/magazine/`);
      const json = await res.json();
      const magazines = json?.results?.result || [];
console.log("Fetched magazines:", magazines);
      setMagazineData(magazines);
    } catch (err) {
      console.error("Failed to fetch magazines:", err);
    }
  };

  if (activeTab === "latest") {
    fetchMagazines();
  }
}, [activeTab]);

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
const [sidebarNews, setSidebarNews] = useState([]);

useEffect(() => {
  const fetchSidebarNews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/news/sidebar/`);
      const json = await res.json();

      const data = Array.isArray(json) ? json : [];

      // DON'T filter here, keep all items
      setSidebarNews(data);
    } catch (err) {
      console.error("Failed to fetch sidebar news:", err);
    }
  };

  fetchSidebarNews();
}, []);




const renderSidebarContent = (data) => {
  let sourceData;

  if (activeTab === "trending") {
    sourceData = data.filter(item => !item.magazine && !item.iframe);
  } else if (activeTab === "videos") {
    sourceData = data.filter(item => item.iframe);
  } else if (activeTab === "latest") {
    sourceData = data.filter(item => item.pdf_file);
  } else {
    sourceData = data;
  }

  const sorted =
    activeTab === "trending" || activeTab === "videos"
      ? sourceData.sort((a, b) => b.view_count - a.view_count)
      : sourceData;

  const filtered = sorted.filter(item =>
    i18n.language === 'am'
      ? item.title_am && item.title_am.trim() !== ''
      : item.title && item.title.trim() !== ''
  );

  const badgeColor =
    activeTab === "trending"
      ? "bg-blue-100 text-blue-800"
      : activeTab === "videos"
        ? "bg-green-100 text-green-800"
        : "bg-orange-100 text-orange-800";

  return filtered.slice(0, 5).map(a => (
    <div
      key={a.id}
      className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
      onClick={() => {
        navigateToDetail(a);
      }}
    >
      <div className="relative flex-shrink-0">
        <img
          src={
            activeTab === "videos"
              ? getVideoThumbnail(a.iframe, a.cover_image)
              : `${BASE_URL}${a.cover_image}`
          }
          alt={i18n.language === 'am' ? a.title_am : a.title}
          onError={e => {
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
        <span className={`inline-block text-xs mb-2 px-2 py-1 rounded ${badgeColor}`}>
          {i18n.language === 'am' ? a.category?.name_am : a.category?.name}
        </span>

        <h4 className="text-sm font-medium leading-tight mb-2 line-clamp-3">
          {i18n.language === 'am' ? a.title_am : a.title}
        </h4>

        <div className="flex items-center text-xs text-gray-500">
          <CalendarIcon size="w-2.5 h-2.5" />
          <span className="ml-1">{formatDate(a.created_at)}</span>
        </div>
      </div>
    </div>
  ));
};



const featuredArticle = [...newsData]
  .filter(a => !a.magazine && !a.iframe) // ✅ filter magazines out
  .sort((a, b) => b.view_count - a.view_count)[0];


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
        <div className="relative  flex items-center justify-center mt-32 text-white text-center">
          <div className="mx-auto text-center justify-normal">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{t('news_and_videos')}</h1>
            <p className="text-xl">{t('advancing_innovation_through_technology')}</p>
          </div>
        </div>
      </div>

      <main className="max-w-[90%] mx-auto py-8">
        <div className="relative flex h-full bg-transparent container mx-auto px-4 py-2">
          <div className="relative inline-block hover:bg-gray-200 transition rounded-full z-10 shadow-2xl">
            <button
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-full transition"
              aria-label={t("Filter")}
            >
              <FiFilter className="w-5 h-5 text-black" />
            </button>

            {open && (
              <div
                ref={panelRef}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10 p-4 space-y-4"
              >
                <h3 className="text-gray-800 font-semibold">{t("Filter News")}</h3>

                {/* Category */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t("Category")}</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="">{t("All Categories")}</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {i18n.language === "am" ? cat.name_am : cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t("From")}</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t("To")}</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  />
                </div>

                {/* Type Dropdown */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">{t("Type")}</label>
                  <select
                    value={newsType}
                    onChange={(e) => setNewsType(e.target.value)}
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  >
                    <option value="all">{t("All")}</option>
                    <option value="regular">{t("Regular News")}</option>
                    <option value="magazine">{t("Magazine")}</option>
                    <option value="video">{t("Video News")}</option>
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setOpen(false)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                  >
                    {t("Close")}
                  </button>
                  <button
                    onClick={() => {
                      setOpen(false);

                      // Reset lists & pagination
                      addedItemIds.current.clear();
                      setMergedContent([]);
                      setNewsData([]);
                      pageRef.current = 1;
                      setPage(1);
                      setHasMore(true);

                      // Apply filters
                      setCategory(filterCategory);

                      // Immediately fetch with new filters
                      fetchContent(1);
                    }}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                  >
                    {t("Apply")}
                  </button>
                </div>
              </div>
            )}
          </div>
        {/* 🔍 Search Field */}
        <div className=" items-center border border-gray-300 rounded px-2 py-1 bg-white shadow-sm">
          <input
            type="text"
            placeholder={t("Search...")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                runSearch(); // <- Function we'll define
              }
            }}
            className="outline-none w-56 text-sm"
          />
          <button
            onClick={runSearch}
            className="ml-2 text-sm text-blue-600 hover:underline"
          >
            <FiSearch className="text-black"/>
          </button>
        </div>
        </div>
        {error && (
          <div className="mt-[-10] flex items-center justify-center">
            <p className="text-lg text-red-500">{error}</p>
          </div>
        )}

<div className={error ? "hidden" : "grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10"}>
<Leftsidebar
   leftColumnNews={sidebarNews.filter(item => !item.iframe && !item.magazine)}  // <- Pass sidebarNews, not newsData or mergedContent
  BASE_URL={BASE_URL}
  CalendarIcon={CalendarIcon}
  formatDate={formatDate}
  navigateToDetail={navigateToDetail}
/>

  <CenterColumn
    featuredArticle={featuredArticle}  // keep this if you want featured from main news or adjust accordingly
    BASE_URL={BASE_URL}
    techNews={sidebarNews}             // <-- use sidebarNews here as well or filter as needed
    CalendarIcon={CalendarIcon}
    formatDate={formatDate}
    navigateToDetail={navigateToDetail}
  />
  <RightSidebar
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    renderSidebarContent={() => renderSidebarContent(sidebarNews)} // modify renderSidebarContent to accept data param
  />
</div>


      </main>

<section className="max-w-7xl mx-auto px-4 py-16">
  
  <div className="space-y-8">
    <SocialMediaLinks />

    {(() => {
      // Filtered arrays without magazines, with correct language titles
      const newsItems = mergedContent.filter(
        item =>
          !item.magazine &&
          !item.iframe &&
          (i18n.language === "am" ? item.title_am?.trim() : item.title?.trim())
      );
      const videoItems = mergedContent.filter(
        item =>
          !item.magazine &&
          item.iframe &&
          (i18n.language === "am" ? item.title_am?.trim() : item.title?.trim())
      );

      // Mix 2 news + 1 video pattern
      const mixed = [];
      let nIndex = 0,
        vIndex = 0;

      while (nIndex < newsItems.length || vIndex < videoItems.length) {
        // Add up to 2 news items
        for (let i = 0; i < 2 && nIndex < newsItems.length; i++, nIndex++) {
          mixed.push({ ...newsItems[nIndex], type: "news", key: `news-${newsItems[nIndex].id}-${nIndex}` });
        }
        // Add 1 video item
        if (vIndex < videoItems.length) {
          mixed.push({ ...videoItems[vIndex], type: "video", key: `video-${videoItems[vIndex].id}-${vIndex}` });
          vIndex++;
        }
      }

      // Render mixed array
      return mixed.map((item, idx) => {
        if (item.type === "video") {
          return (
            <div
              key={item.key}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg"
              onClick={() => navigateToDetail(item)}
            >
              <div className="relative">
                <img
                  src={getVideoThumbnail(item.iframe, item.cover_image)}
                  alt={i18n.language === "am" ? item.title_am : item.title}
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
                <h3 className="text-xl font-bold mb-2">{i18n.language === "am" ? item.title_am : item.title}</h3>
                <p className="text-gray-600 mb-4">{i18n.language === "am" ? item.subtitle_am : item.subtitle}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{item.view_count} views</span>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>
            </div>
          );
        } else {
          // News item
          return (
            <MajorNews
              key={item.key}
              majorNews={item}
              BASE_URL={BASE_URL}
              PlayIcon={PlayIcon}
              CalendarIcon={CalendarIcon}
              formatDate={formatDate}
              navigateToDetail={navigateToDetail}
            />
          );
        }
      });
    })()}
    
    <div ref={observerTarget} className="py-4 text-center">
      {loading && page > 1 && (
        <div className="flex justify-center">
          <svg
            className="animate-spin h-6 w-6 text-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
        </div>
      )}
      {!hasMore && <p>{t("you_ve_reached_the_end_of_the_content")}</p>}
    </div>
  </div>
</section>


      {/* <Footer /> */}
    </div>
  );
}

export default News;