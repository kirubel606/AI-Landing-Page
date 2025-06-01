"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"

// Add these imports at the top of the file
import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// Icon components
const CalendarIcon = ({ size = "w-3 h-3" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const EyeIcon = ({ size = "w-4 h-4" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
)

const BackIcon = ({ size = "w-5 h-5" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const ShareIcon = ({ size = "w-5 h-5" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
)

function NewsDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [newsItem, setNewsItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])

  // Add this state after the other state declarations in the NewsDetail component
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxImages, setLightboxImages] = useState([])

  useEffect(() => {
    if (id) {
      fetchNewsDetail(id)
    }
  }, [id])

  const fetchNewsDetail = async (newsId) => {
    try {
      setLoading(true)
      // Fetch the specific news item
      const response = await fetch(`${BASE_URL}/news/news/${newsId}/`)
      const data = await response.json()

      if (data) {
        setNewsItem(data)

        // Fetch related news based on category
        if (data.category) {
          fetchRelatedNews(data.category, data.id)
        }
      } else {
        setError("News item not found")
      }
    } catch (err) {
      setError("Failed to fetch news details")
      console.error("Error fetching news details:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedNews = async (currentId) => {
    try {
      const response = await fetch(`${BASE_URL}/news/related/${currentId}/`)
      const data = await response.json()

      if (data.results && data.results.result) {
        // Filter out the current article and limit to 3 related articles
        const filtered = data.results.result.filter((item) => item.id !== currentId).slice(0, 3)

        setRelatedNews(filtered)
      }
    } catch (err) {
      console.error("Error fetching related news:", err)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: newsItem.title,
        text: newsItem.subtitle,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy link:", err))
    }
  }

  // Add this function before the return statement
  const openLightbox = (images, startIndex = 0) => {
    setLightboxImages(images)
    setCurrentImageIndex(startIndex)
    setLightboxOpen(true)
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    // Re-enable scrolling
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction) => {
    const newIndex = currentImageIndex + direction
    if (newIndex >= 0 && newIndex < lightboxImages.length) {
      setCurrentImageIndex(newIndex)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    )
  }

  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading News</h2>
          <p className="text-gray-600 mb-4">{error || "News item not found"}</p>
          <button
            onClick={() => navigate("/news")}
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    )
  }

  const isVideo = !!newsItem.iframe

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="min-h-[40vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-dvh w-full">
          <CoolSvg />
        </div>
        <div className="relative h-full bg-transparent container mx-auto px-4 py-12">

          <div className="max-w-4xl mx-auto">
            <div className="text-white mt-[10%]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{newsItem.title}</h1>
              <p className="text-lg opacity-90 mb-6">{newsItem.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="bg-orange-400 text-white px-3 py-1 rounded">{newsItem.category}</span>

                <div className="flex items-center">
                  <CalendarIcon />
                  <span className="ml-1">{formatDate(newsItem.created_at)}</span>
                </div>

                <div className="flex items-center">
                  <EyeIcon />
                  <span className="ml-1">{newsItem.view_count} views</span>
                </div>

                <button onClick={handleShare} className="flex items-center hover:text-orange-300 transition-colors">
                  <ShareIcon />
                  <span className="ml-1">Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
      <button
            onClick={() => navigate("/news")}
            className="flex items-center text-black hover:text-orange-300 transition-colors mb-6"
          >
            <BackIcon />
            <span className="ml-2">Back to News</span>
          </button>
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {!isVideo && (
            <div className="mb-8 relative group">
              <img
                src={`${BASE_URL}${newsItem.cover_image}`}
                alt={newsItem.title}
                className="w-full rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x600"
                }}
              />
              <button
                onClick={() => openLightbox([`${BASE_URL}${newsItem.cover_image}`])}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-400"
                aria-label="View full screen"
              >
                <Maximize size={20} />
              </button>
            </div>
          )}

          {/* Video Content */}
          {isVideo && (
            <div className="mb-8 flex justify-center overflow-hidden rounded-lg shadow-lg">
              <div
                className="w-full max-w-4xl aspect-video rounded-lg shadow-lg [&>iframe]:w-full [&>iframe]:h-full"
                dangerouslySetInnerHTML={{ __html: newsItem.iframe }}
              />
            </div>
          )}



          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
          </div>

          {/* Additional Images */}
          {newsItem.images && newsItem.images.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Gallery</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {newsItem.images.map((img, index) => {
                  const imageUrl = `${BASE_URL}${img.image}`
                  return (
                    <div key={img.id || index} className="rounded-lg overflow-hidden shadow-md relative group">
                      <img
                        src={imageUrl || "/placeholder.svg"}
                        alt={`${newsItem.title} - Image ${index + 1}`}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300"
                        }}
                      />
                      <button
                        onClick={() => {
                          const galleryImages = newsItem.images.map((galleryImg) => `${BASE_URL}${galleryImg.image}`)
                          openLightbox(galleryImages, index)
                        }}
                        className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-400"
                        aria-label="View full screen"
                      >
                        <Maximize size={16} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Author Info */}
          {newsItem.author_username && (
            <div className="mt-12 flex items-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden mr-4">
                {newsItem.author_profile_image ? (
                  <img
                    src={`${BASE_URL}${newsItem.author_profile_image}`}
                    alt={newsItem.author_username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-orange-400 text-white text-xl">
                    {newsItem.author_username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-lg">Author</h4>
                <p>{newsItem.author_username}</p>
              </div>
            </div>
          )}
        </div>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6">Related News</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/news/${article.id}`)}
                >
                  <div className="relative">
                    <img
                      src={`${BASE_URL}${article.cover_image}`}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200"
                      }}
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                    {article.iframe && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-orange-400 text-white rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <polygon points="5,3 19,12 5,21" fill="currentColor" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.subtitle}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon />
                        <span className="ml-1">{formatDate(article.created_at)}</span>
                      </div>
                      <div className="flex items-center">
                        <EyeIcon size="w-3 h-3" />
                        <span className="ml-1">{article.view_count} views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            {/* Image counter */}
            <div className="absolute top-4 left-4 text-white text-sm">
              {currentImageIndex + 1} / {lightboxImages.length}
            </div>

            {/* Image */}
            <div className="w-full h-full flex items-center justify-center p-4 md:p-12">
              <img
                src={lightboxImages[currentImageIndex] || "/placeholder.svg"}
                alt={`Full screen image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Navigation buttons */}
            {lightboxImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage(-1)}
                  disabled={currentImageIndex === 0}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors ${
                    currentImageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={40} />
                </button>
                <button
                  onClick={() => navigateImage(1)}
                  disabled={currentImageIndex === lightboxImages.length - 1}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors ${
                    currentImageIndex === lightboxImages.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Next image"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default NewsDetail
