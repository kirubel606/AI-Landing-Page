import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/quotes/testimonials/")
        setTestimonials(response.data)
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
      }
    }

    fetchTestimonials()
  }, [])


  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + testimonials.length) % testimonials.length
      visible.push({
        ...testimonials[index],
        position: i,
      })
    }
    return visible
  }

  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Testimonial</h2>

        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>

          {/* Testimonial Cards */}
          <div className="flex items-center justify-center space-x-4 overflow-hidden px-2">
            {getVisibleTestimonials().map((testimonial, index) => {
              const isCenter = testimonial.position === 0
              const isAdjacent = Math.abs(testimonial.position) === 1
              const isEdge = Math.abs(testimonial.position) === 2

              return (
                <div
                  key={`${testimonial.id}-${index}`}
                  className={`
                    transition-all duration-500 ease-in-out rounded-2xl p-3 shadow-lg
                    ${isCenter ? "" : ""}
                    ${
                      isCenter
                        ? "w-80 h-64 opacity-100 scale-100 z-20 bg-gradient-to-br text-white from-blue-900 via-blue-700 to-violet-700"
                        : isAdjacent
                          ? "w-64 h-56 opacity-80 scale-90 z-10 bg-gradient-to-br text-gray-800 from-orange-500 via-orange-300 to-orange-100"
                          : "w-48 h-48 opacity-60 scale-75 z-0 text-gray-800"
                    }
                    ${isEdge ? "hidden md:block blur-sm text-gray-800 bg-orange-200" : ""}
                  `}
                >
                  <div className="h-full flex flex-col justify-between">
                    <blockquote
                      className={`
                        leading-relaxed mb-4 overflow-hidden
                        ${isCenter ? "text-base font-semibold" : "text-xs"}
                        ${isCenter ? "" : " text-xs"}
                      `}
                    >
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className={`rounded-full object-cover ${isCenter ? "w-12 h-12 text-white" : "w-10 h-10"}`}
                      />
                      <div>
                        <p
                          className={`
                            font-semibold
                            ${isCenter ? "text-base font-bold text-white" : "text-gray-900 text-xs"}
                            ${isCenter ? "" : " text-xs"}
                          `}
                        >
                          {testimonial.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial
