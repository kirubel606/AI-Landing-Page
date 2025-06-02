"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"
import Leftsidebar from "../components/News/Leftsidebar"
import RightSidebar from "../components/News/RightSidebar"
import CenterColumn from "../components/News/CenterColumn"
import MajorNews from "../components/News/MajorNews"
const BASE_URL = import.meta.env.VITE_API_BASE_URL
// Icon components (simple SVG icons)
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
  // State for news data
  const [newsData, setNewsData] = useState([])
  const [videoData, setVideoData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // State for UI
  const [activeTab, setActiveTab] = useState("latest")
  const [visibleVideos, setVisibleVideos] = useState(1)
  const [isLoadingVideos, setIsLoadingVideos] = useState(false)

  // Fetch news data from backend
  useEffect(() => {
    fetchNewsData()
  }, [])

  const fetchNewsData = async () => {
    try {
      setLoading(true)
      // Replace with your actual API endpoint
      const response = await fetch(`${BASE_URL}/news/all/`) // Adjust this URL to match your backend
      const data = await response.json()

      if (data.results && data.results.result) {
        const allNews = data.results.result

        // Separate videos (items with iframe) from regular news
        const videos = allNews.filter((item) => item.iframe)
        const regularNews = allNews.filter((item) => !item.iframe)

        setVideoData(videos)
        setNewsData(regularNews)
      }
    } catch (err) {
      setError("Failed to fetch news data")
      console.error("Error fetching news:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date

    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)

    if (diffMinutes < 1) return "Just now"
    if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`
    if (diffDays < 30) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`
  }

  // Helper function to extract video duration from iframe
  const extractVideoDuration = (iframe) => {
    // This is a placeholder - you might want to implement actual duration extraction
    // or store duration in your backend
    return "5:24"
  }

  // Helper function to get video thumbnail from iframe
  const getVideoThumbnail = (iframe, coverImage) => {
    // Try to extract YouTube thumbnail or use cover image
    if (iframe && iframe.includes("youtube.com/embed/")) {
      const videoId = iframe.match(/embed\/([^?]+)/)?.[1]
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      }
    }
    return coverImage
  }

  const handleVideoScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight && !isLoadingVideos && visibleVideos < videoData.length) {
      setIsLoadingVideos(true)
      setTimeout(() => {
        setVisibleVideos((prev) => Math.min(prev + 1, videoData.length))
        setIsLoadingVideos(false)
      }, 1000)
    }
  }

  const navigateToDetail = (newsItem) => {
    navigate(`/news/${newsItem.id}`)
  }

  const renderSidebarContent = () => {
    let displayData = []
    let badgeColor = "bg-orange-100 text-orange-800"

    switch (activeTab) {
      case "trending":
        // Filter trending news or use a different endpoint
        displayData = newsData.sort((a, b) => b.view_count - a.view_count)
        badgeColor = "bg-blue-100 text-blue-800"
        break
      case "videos":
        displayData = videoData.sort((a, b) => b.view_count - a.view_count)
        badgeColor = "bg-green-100 text-green-800"
        break
      default:
        displayData = newsData.slice(0, 6)
        badgeColor = "bg-orange-100 text-orange-800"
    }

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
                ? getVideoThumbnail(article.iframe, `${BASE_URL}` + article.cover_image)
                : `${BASE_URL}` + article.cover_image
            }
            alt={article.title}
            className="w-20 h-20 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/80x80"
            }}
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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading News</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchNewsData}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  // Get featured article (first non-video article)
  const Mostviewed = newsData.sort((a, b) => b.view_count - a.view_count)
  const featuredArticle = Mostviewed[0]

  // Get articles for different sections
  const leftColumnNews = newsData
  const techNews = newsData
  const majorNews = newsData.find((article) => article.category === "Healthcare") || newsData[newsData.length - 1]

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
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[90%] mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Leftsidebar
            leftColumnNews = {leftColumnNews}
            BASE_URL = {BASE_URL}
            CalendarIcon = {CalendarIcon}
            formatDate ={formatDate}
            navigateToDetail = {navigateToDetail}
          />
          <CenterColumn 
            featuredArticle = {featuredArticle}
            BASE_URL={BASE_URL}
            techNews = {techNews}
            CalendarIcon ={CalendarIcon}
            formatDate ={formatDate}
            navigateToDetail={navigateToDetail}
          />

          <RightSidebar 
            activeTab={activeTab}
            setActiveTab ={setActiveTab}
            renderSidebarContent={renderSidebarContent}
          />
        </div>
        <MajorNews 
          majorNews = {majorNews}
          BASE_URL={BASE_URL}
          PlayIcon = {PlayIcon}
          CalendarIcon ={CalendarIcon}
          formatDate ={formatDate}
          navigateToDetail={navigateToDetail}
        />
      </main>

      {/* Video Section */}
      {videoData.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Videos</h2>
          <div className="space-y-8 max-h-screen overflow-y-auto" onScroll={handleVideoScroll}>
            {videoData.slice(0, visibleVideos).map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
                onClick={() => navigateToDetail(video)}
              >
                <div className="relative">
                  <img
                    src={getVideoThumbnail(video.iframe, video.cover_image) || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-64 md:h-80 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/500x300"
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-orange-400 text-white backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors">
                      <PlayIcon size="w-8 h-8" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/80 text-white text-sm px-2 py-1 rounded">
                    {extractVideoDuration(video.iframe)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                  <p className="text-gray-600 mb-4">{video.subtitle}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{video.view_count} views</span>
                    <span>{formatDate(video.created_at)}</span>
                  </div>
                </div>
              </div>
            ))}

            {isLoadingVideos && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            )}

            {visibleVideos >= videoData.length && videoData.length > 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No more videos to load</p>
              </div>
            )}
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

export default News
