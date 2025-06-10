"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"
import Leftsidebar from "../components/News/Leftsidebar"
import RightSidebar from "../components/News/RightSidebar"
import CenterColumn from "../components/News/CenterColumn"
import MajorNews from "../components/News/MajorNews"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const PlayIcon = ({ size = "w-6 h-6" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21" fill="currentColor" />
  </svg>
)

const CalendarIcon = ({ size = "w-3 h-3" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

function News() {
  const navigate = useNavigate()
  const [newsData, setNewsData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState("latest")
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const observerTarget = useRef(null)
  const [mergedContent, setMergedContent] = useState([])
  const addedItemIds = useRef(new Set()) // Track added IDs to prevent duplicates

  // Helper to get video thumbnail from YouTube iframe embed URL
const getVideoThumbnail = (iframe, coverImage) => {
  if (!iframe) return coverImage ? `${BASE_URL}${coverImage}` : ""

  // Match src attribute from full iframe string
  const match = iframe.match(/src="https:\/\/www\.youtube\.com\/embed\/([^"?]+)/)
  const videoId = match ? match[1] : null

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  return coverImage ? `${BASE_URL}${coverImage}` : ""
}


  const extractVideoDuration = () => "5:24" // Placeholder, adjust if real duration needed

  const navigateToDetail = (item) => navigate(`/news/${item.id}`)

  // Fetch paginated content and merge news & videos interleaved without duplicates
  useEffect(() => {
    const fetchContent = async () => {
      if (!hasMore || loading) return

      setLoading(true)
      setError(null)

      try {
        // Fetch combined news & videos (assuming same endpoint)
        const response = await fetch(`${BASE_URL}/news/all/?page=${page}`)
        const json = await response.json()
        const results = json?.results?.result || []

        if (results.length === 0) {
          setHasMore(false)
          setLoading(false)
          return
        }

        // Filter out already added items by id
        const newNews = results
          .filter((item) => !item.iframe && !addedItemIds.current.has(item.id))
        const newVideos = results
          .filter((item) => item.iframe && !addedItemIds.current.has(item.id))

        if (newNews.length === 0 && newVideos.length === 0) {
          setHasMore(false)
          setLoading(false)
          return
        }

        // Interleave 2 news and 1 video repeatedly
        let interleaved = []
        let newsIndex = 0
        let videoIndex = 0

        while (newsIndex < newNews.length || videoIndex < newVideos.length) {
          for (let i = 0; i < 2 && newsIndex < newNews.length; i++) {
            const newsItem = newNews[newsIndex++]
            if (!addedItemIds.current.has(newsItem.id)) {
              interleaved.push({ type: "news", data: newsItem })
              addedItemIds.current.add(newsItem.id)
            }
          }
          if (videoIndex < newVideos.length) {
            const videoItem = newVideos[videoIndex++]
            if (!addedItemIds.current.has(videoItem.id)) {
              interleaved.push({ type: "video", data: videoItem })
              addedItemIds.current.add(videoItem.id)
            }
          }
        }

        setMergedContent((prev) => [...prev, ...interleaved])
        setPage((prev) => prev + 1)
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Failed to fetch news data")
        setHasMore(false)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [page, hasMore, loading])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!observerTarget.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1)
        }
      },
      { threshold: 1.0 }
    )

    observer.observe(observerTarget.current)

    return () => {
      if (observerTarget.current) observer.unobserve(observerTarget.current)
    }
  }, [hasMore, loading])

  // Fetch initial separate news and videos for sidebar and main columns
  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${BASE_URL}/news/all/`)
        const data = await res.json()
        if (data.results?.result) {
          const allNews = data.results.result
          setVideoData(allNews.filter((item) => item.iframe))
          setNewsData(allNews.filter((item) => !item.iframe))

          // Also add initial IDs to addedItemIds to avoid duplicates in infinite scroll
          allNews.forEach((item) => addedItemIds.current.add(item.id))
        }
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Failed to fetch news data")
      } finally {
        setLoading(false)
      }
    }
    fetchInitialData()
  }, [])

  // Format dates nicely
  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now - date
    const mins = Math.floor(diffMs / 60000)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)

    if (mins < 1) return "Just now"
    if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`
    if (days < 30) return `${weeks} week${weeks > 1 ? "s" : ""} ago`
    return `${months} month${months > 1 ? "s" : ""} ago`
  }

  // Sidebar content render helper
  const renderSidebarContent = () => {
    const displayData =
      activeTab === "trending"
        ? [...newsData].sort((a, b) => b.view_count - a.view_count)
        : activeTab === "videos"
        ? [...videoData].sort((a, b) => b.view_count - a.view_count)
        : newsData.slice(0, 6)

    const badgeColor =
      activeTab === "trending"
        ? "bg-blue-100 text-blue-800"
        : activeTab === "videos"
        ? "bg-green-100 text-green-800"
        : "bg-orange-100 text-orange-800"

    return displayData.slice(0, 5).map((article) => (
      <div
        key={article.id}
        className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => navigateToDetail(article)}
      >
        <div className="relative flex-shrink-0">
          <img
            src={
              activeTab === "videos"
                ? getVideoThumbnail(article.iframe, article.cover_image)
                : `${BASE_URL}${article.cover_image}`
            }
            alt={article.title}
            className="w-20 h-20 object-cover rounded-lg"
          />
          {activeTab === "videos" && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-400 backdrop-blur-sm rounded-full text-white flex items-center justify-center">
                  <PlayIcon size="w-3 h-3" />
                </div>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                {extractVideoDuration(article.iframe)}
              </div>
            </>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <span className={`inline-block text-xs mb-2 px-2 py-1 rounded ${badgeColor}`}>{article.category}</span>
          <h4 className="text-sm font-medium leading-tight mb-2 line-clamp-3">{article.title}</h4>
          <div className="flex items-center text-xs text-gray-500">
            <CalendarIcon size="w-2.5 h-2.5" />
            <span className="ml-1">{formatDate(article.created_at)}</span>
          </div>
        </div>
      </div>
    ))
  }

  if (loading && mergedContent.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error && mergedContent.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading News</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const featuredArticle = [...newsData].sort((a, b) => b.view_count - a.view_count)[0]
  const majorNews = newsData.find((n) => n.category === "Healthcare") || newsData[newsData.length - 1]

  return (
    <div className="min-h-screen bg-white">
      <div className="min-h-[30vh] md:min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-dvh w-full">
          <CoolSvg />
        </div>
        <div className="relative h-64 bg-transparent mx-20">
          <div className="z-20 flex items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center text-center text-white h-full px-4 py-20">
              <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold mt-[30%] mb-4 leading-tight">
                News & <span className="text-orange-400">Videos</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-90">
                Advancing Innovation Through Technology
              </p>
            </div>
          </div>
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
      </div>

      <main className="max-w-[90%] mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
          <Leftsidebar
            leftColumnNews={newsData}
            BASE_URL={BASE_URL}
            CalendarIcon={CalendarIcon}
            formatDate={formatDate}
            navigateToDetail={navigateToDetail}
          />
          <CenterColumn
            featuredArticle={featuredArticle}
            BASE_URL={BASE_URL}
            techNews={newsData}
            CalendarIcon={CalendarIcon}
            formatDate={formatDate}
            navigateToDetail={navigateToDetail}
          />
          <RightSidebar activeTab={activeTab} setActiveTab={setActiveTab} renderSidebarContent={renderSidebarContent} />
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Tech News & Videos</h2>
        <div className="space-y-8">
          {mergedContent.map((item, idx) =>
            item.type === "news" ? (
              <div
                key={`news-${idx}`}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigateToDetail(item.data)}
              >
                <MajorNews majorNews={item.data} BASE_URL={BASE_URL} PlayIcon={PlayIcon} CalendarIcon={CalendarIcon} formatDate={formatDate} navigateToDetail={navigateToDetail} />
              </div>
            ) : (
              <div
                key={`video-${idx}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={() => navigateToDetail(item.data)}
              >
                <div className="relative">
                  <img
                    src={getVideoThumbnail(item.data.iframe, item.data.cover_image)}
                    alt={item.data.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-orange-400 text-white backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors">
                      <PlayIcon size="w-8 h-8" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {extractVideoDuration(item.data.iframe)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.data.title}</h3>
                  <p className="text-gray-600 mb-4">{item.data.subtitle}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{item.data.view_count} views</span>
                    <span>{formatDate(item.data.created_at)}</span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>

        <div ref={observerTarget} className="py-4 text-center">
          {loading && <p>Loading more content...</p>}
          {!hasMore && !loading && mergedContent.length > 0 && <p>You've reached the end of the content!</p>}
          {!hasMore && !loading && mergedContent.length === 0 && <p>No content available.</p>}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default News
