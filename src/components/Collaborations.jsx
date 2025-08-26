import { useContext, useState, useEffect, useRef } from "react"
import { AppContext } from "../context/Appcontext"
import { useTranslation } from "react-i18next"

const Collaborations = () => {
  const { collabs } = useContext(AppContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [activeTab, setActiveTab] = useState("local") // New tab state
  const autoRotateTimerRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const { t, i18n } = useTranslation()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-rotate
  useEffect(() => {
    if (!collabs || collabs.length === 0 || isPaused) return
    const startAutoRotate = () => {
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredCollabs.length)
      }, 5000)
    }
    startAutoRotate()
    return () => autoRotateTimerRef.current && clearInterval(autoRotateTimerRef.current)
  }, [collabs, isPaused, activeTab])

  const handleDotClick = (index) => {
    setCurrentIndex(index)
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current)
      if (!isPaused) {
        autoRotateTimerRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredCollabs.length)
        }, 5000)
      }
    }
  }

  // Filter collaborations based on tab
  const filteredCollabs = collabs?.filter((c) =>
    activeTab === "local" ? c.is_local : !c.is_local
  ) || []

  // Infinite scrolling items
  const getInfiniteCollabs = () => {
    if (!filteredCollabs || filteredCollabs.length === 0 || !isClient) return []
    let itemsToShow = 8
    if (window.innerWidth < 640) itemsToShow = 2
    else if (window.innerWidth < 768) itemsToShow = 4
    else if (window.innerWidth < 1024) itemsToShow = 6

    const result = []
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % filteredCollabs.length
      result.push({ ...filteredCollabs[index], key: `collab-${i}-${filteredCollabs[index].id}` })
    }
    return result
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("partners")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("working_together_ai")}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8 space-x-4">
          {["local", "international"].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentIndex(0) }}
              className={`py-2 px-4 rounded-full font-medium transition-all duration-200 ${
                activeTab === tab
                  ? "bg-orange-100 text-orange-600 italic font-bold"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              }`}
            >
              {tab === "local" ? t("local") : t("international")}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-8 items-center">
            {isClient && getInfiniteCollabs().map((collab) => (
              <div key={collab.key} className="flex justify-center transition-all duration-500 ease-in-out">
                <a href={collab.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={collab.logo || "/placeholder.svg"}
                    alt={`${collab.name || "Collaboration"} logo`}
                    className="h-16 md:h-24 w-auto object-contain opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              </div>
            ))}

            {(!isClient || filteredCollabs.length === 0) && (
              <p className="col-span-full text-center">{t("no_collaborations_found")}</p>
            )}
          </div>

          {/* Dots */}
          {filteredCollabs.length > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              {filteredCollabs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? "bg-orange-600" : "bg-gray-300"
                  }`}
                  aria-label={`View collaboration set ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Collaborations
