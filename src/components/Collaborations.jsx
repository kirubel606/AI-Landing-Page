"use client"

import { useContext, useState, useEffect, useRef } from "react"
import { AppContext } from "../context/Appcontext"
import { useTranslation } from 'react-i18next';

const Collaborations = () => {
  const { collabs } = useContext(AppContext)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const autoRotateTimerRef = useRef(null)
  const [isClient, setIsClient] = useState(false)
  const { t } = useTranslation();

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (!collabs || collabs.length === 0 || isPaused) return

    const startAutoRotate = () => {
      autoRotateTimerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % collabs.length)
      }, 5000)
    }

    startAutoRotate()

    return () => {
      if (autoRotateTimerRef.current) {
        clearInterval(autoRotateTimerRef.current)
      }
    }
  }, [collabs, isPaused])

  // Handle dot navigation
  const handleDotClick = (index) => {
    setCurrentIndex(index)

    // Reset the timer
    if (autoRotateTimerRef.current) {
      clearInterval(autoRotateTimerRef.current)

      if (!isPaused) {
        autoRotateTimerRef.current = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % collabs.length)
        }, 5000)
      }
    }
  }

  // Create a continuous array for infinite scrolling
  const getInfiniteCollabs = () => {
    if (!collabs || collabs.length === 0 || !isClient) return []

    // Determine how many items to show based on screen width
    let itemsToShow = 8 // Default for desktop

    if (window.innerWidth < 640) {
      itemsToShow = 2 // Mobile
    } else if (window.innerWidth < 768) {
      itemsToShow = 4 // Small tablets
    } else if (window.innerWidth < 1024) {
      itemsToShow = 6 // Tablets
    }

    // Create an array with enough items to fill the view
    const result = []
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % collabs.length
      result.push({
        ...collabs[index],
        key: `collab-${i}-${collabs[index].id}`,
      })
    }

    return result
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('collaborations')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('working_together_ai')}
          </p>
        </div>

        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Responsive grid for collaborations */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 md:gap-8 items-center">
            {isClient &&
              getInfiniteCollabs().map((collab) => (
                <div key={collab.key} className="flex justify-center transition-all duration-500 ease-in-out">
                  <a href={collab.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={collab.logo || "/placeholder.svg"}
                    alt={`${collab.name || "Collaboration"} logo`}
                    className="h-16 md:h-24 w-auto object-contain  hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                  />
                  </a>
                </div>
              ))}

            {(!isClient || !collabs || collabs.length === 0) && (
              <p className="col-span-full text-center">{t('no_collaborations_found')}</p>
            )}
          </div>

          {/* Navigation dots */}
          {collabs && collabs.length > 0 && (
            <div className="flex justify-center mt-8 space-x-2">
              {collabs.map((_, index) => (
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
