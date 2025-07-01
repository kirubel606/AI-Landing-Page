"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"
import { useTranslation } from 'react-i18next'

// Add these imports at the top of the file
import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react"
import RightSidebar from "../components/News/RightSidebar"
import { AppContext } from "../context/Appcontext"
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE
import SocialMediaLinks from "../components/SocialMediaLinks"
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
const PlayIcon = ({ size = "w-6 h-6" }) => (
  <svg className={size} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21" fill="currentColor" />
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
  const [activeTab, setActiveTab] = useState("latest")
  const { newsData } = useContext(AppContext)
  const videoData = newsData.filter((item) => item.iframe)
  const normalData = newsData.filter((item) => !item.iframe)
  const [magazineData, setMagazineData] = useState([]);
  const { t, i18n } = useTranslation()

  // Lightbox states
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxImages, setLightboxImages] = useState([])

  useEffect(() => {
    if (id) {
      fetchNewsDetail(id)
    }
  }, [id])
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
  const fetchNewsDetail = async (newsId) => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/news/news/${newsId}/`)
      const data = await response.json()

      if (data) {
        setNewsItem(data)
        if (data.category) {
          fetchRelatedNews(data.id)
        }
      } else {
        setError(t('news_not_found'))
      }
    } catch (err) {
      setError(t('error_loading_news'))
      console.error("Error fetching news details:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchRelatedNews = async (currentId) => {
    try {
      const response = await fetch(`${BASE_URL}/news/related/${currentId}/`)
      const data = await response.json()
      setRelatedNews(data)
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
      try {
        navigator.share({
          title: newsItem.title,
          text: newsItem.subtitle,
          url: window.location.href,
        })
      } catch (err) {
        console.error("Share failed:", err)
        alert("Sharing failed or was canceled.")
      }
    } else {
      navigator.clipboard
        .writeText(window.location.href)
        .then(() => alert("Link copied to clipboard!"))
        .catch((err) => console.error("Failed to copy link:", err))
    }
  }

  // Lightbox handlers
  const openLightbox = (images, startIndex = 0) => {
    setLightboxImages(images)
    setCurrentImageIndex(startIndex)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const navigateImage = (direction) => {
    const newIndex = currentImageIndex + direction
    if (newIndex >= 0 && newIndex < lightboxImages.length) {
      setCurrentImageIndex(newIndex)
    }
  }

  // Helper functions
  const getVideoThumbnail = (iframe, coverImage) => {
    if (iframe && iframe.includes("youtube.com/embed/")) {
      const videoId = iframe.match(/embed\/([^?]+)/)?.[1]
      if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      }
    }
    return coverImage
  }
  const extractVideoDuration = (iframe) => {
    return "5:24" // Placeholder
  }
  const navigateToDetail = (newsItem) => {
    navigate(`/news/${newsItem.id}`)
  }

  const renderSidebarContent = () => {
    let sourceData;
  if (activeTab === "trending") {
    // ✅ Only news, no magazines
    sourceData = newsData.filter(item => !item.magazine && !item.iframe);
  } else if (activeTab === "videos") {
    sourceData = [...videoData];
  } else if (activeTab === "latest") {
  
  sourceData = magazineData.filter(item => item.pdf_file);
  console.log("Magazine data:", magazineData);
}

 else {
    sourceData = newsData;
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

    return filtered.slice(0, 5).map((a) => (
      <div
        key={a.id}
        className="flex space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
        onClick={() => navigateToDetail(a)}
      >
        <div className="relative flex-shrink-0">
          <img
            src={activeTab === "videos" ? getVideoThumbnail(a.iframe, a.cover_image) : `${BASE_URL}${a.cover_image}`}
            alt={i18n.language === 'am' ? a.title_am : a.title}
            onError={(e) => {
              e.target.src = PLACEHOLDER_IMAGE
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
    ))
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('error_loading_news')}</h2>
          <p className="text-gray-600 mb-4">{error || t('news_not_found')}</p>
          <button
            onClick={() => navigate("/news")}
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition-colors"
          >
            {t('back_to_news')}
          </button>
        </div>
      </div>
    )
  }

  // Determine media type
  const isPdfMagazine = !!newsItem.pdf_file
  const isVideo = !!newsItem.iframe

  function decodeHtml(html) {
    const txt = document.createElement("textarea")
    txt.innerHTML = html
    return txt.value
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="min-h-[30vh] md:min-h-[40vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-dvh w-full">
          <CoolSvg />
        </div>
        <SocialMediaLinks />
        <div className="relative h-full bg-transparent container mx-auto px-4 py-12">

          <div className="max-w-4xl mx-auto">
            <div className="text-white mt-[10%]">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{i18n.language === 'am' ? newsItem.title_am : newsItem.title}</h1>

              <p className="text-lg opacity-90 mb-6">{i18n.language === 'am' ? newsItem.subtitle_am : newsItem.subtitle}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">

                <span className="bg-orange-400 text-white px-3 py-1 rounded">{i18n.language === 'am' ? newsItem.category_am : newsItem.category}</span>

                <div className="flex items-center">
                  <CalendarIcon />
                  <span className="ml-1">{formatDate(newsItem.created_at)}</span>
                </div>

                <div className="flex items-center">
                  <EyeIcon />
                  <span className="ml-1">{newsItem.view_count} {t('views')}</span>
                </div>

                <button onClick={handleShare} className="flex items-center hover:text-orange-300 transition-colors">
                  <ShareIcon />
                  <span className="ml-1">{t('share')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="max-w-4xl mx-auto md:mx-auto 3xl:mx-[-200px] md:col-span-3">
          <button
            onClick={() => navigate("/news")}
            className="flex items-center text-black hover:text-orange-300 transition-colors mb-6"
          >
            <BackIcon />
            <span className="ml-2">{t('back_to_news')}</span>
          </button>

          {/* Media Section */}
          {isPdfMagazine ? (
              <div className="col-span-full w-full">
                <div className="p-4">
                  <iframe
                    src={`${BASE_URL}${newsItem.pdf_file}`}
                    className="w-full md:w-[900px] h-[700px] rounded-lg shadow-lg border"
                    title="Article PDF"
                    frameBorder="0"
                  />
                </div>
          

          <div className="mt-4 flex justify-center md:justify-end">
            <a
              href={`${BASE_URL}${newsItem.pdf_file}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
            >
              {t('download_pdf')}
            </a>
          </div>
        </div>
          ) : !isVideo ? (
            <div className="mb-8 relative group">
              <img
                src={`${BASE_URL}${newsItem.cover_image}`}
                alt={i18n.language === 'am' ? newsItem.title_am : newsItem.title}
                className="w-full rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMAGE
                }}
              />
              <button
                onClick={() => openLightbox([`${BASE_URL}${newsItem.cover_image}`])}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-400"
                aria-label={t('view_full_screen')}
              >
                <Maximize size={20} />
              </button>
            </div>
          ) : null}

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
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: decodeHtml(i18n.language === 'am' ? newsItem.content_am : newsItem.content) }}
          />

          {/* Additional Images */}
          {newsItem.images && newsItem.images.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">{t('gallery')}</h3>
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
                          e.target.src = PLACEHOLDER_IMAGE
                        }}
                      />
                      <button
                        onClick={() => {
                          const galleryImages = newsItem.images.map((galleryImg) => `${BASE_URL}${galleryImg.image}`)
                          openLightbox(galleryImages, index)
                        }}
                        className="absolute top-2 right-2 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-400"
                        aria-label={t('view_full_screen')}
                      >
                        <Maximize size={20} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Related News */}
          {relatedNews.length > 0 && (
            <section className="mt-12">
              <h3 className="text-3xl font-bold mb-6">{t('related_news')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((related) => (
                  <div
                    key={related.id}
                    className="cursor-pointer rounded-lg shadow hover:shadow-lg transition-shadow"
                    onClick={() => navigateToDetail(related)}
                  >
                    <img
                      src={`${BASE_URL}${related.cover_image}`}
                      alt={i18n.language === 'am' ? related.title_am : related.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = PLACEHOLDER_IMAGE
                      }}
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold line-clamp-2">
                        {i18n.language === 'am' ? related.title_am : related.title}
                      </h4>
                      <p className="text-sm text-gray-600">{formatDate(related.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <RightSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          renderSidebarContent={renderSidebarContent}
          sidebarItems={newsData}
        />
      </main>

      <Footer />

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={t('image_viewer')}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            className="absolute top-4 right-4 text-white p-2 rounded hover:bg-gray-800"
            aria-label={t('close')}
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage(-1)
            }}
            disabled={currentImageIndex === 0}
            className="absolute left-4 text-white p-2 rounded hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t('previous_image')}
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={lightboxImages[currentImageIndex]}
            alt={`${t('image')} ${currentImageIndex + 1} ${t('of')} ${lightboxImages.length}`}
            className="max-h-[80vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              navigateImage(1)
            }}
            disabled={currentImageIndex === lightboxImages.length - 1}
            className="absolute right-4 text-white p-2 rounded hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={t('next_image')}
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </div>
  )
}

export default NewsDetail
