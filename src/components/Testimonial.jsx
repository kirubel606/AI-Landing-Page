"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(2) // Start with the blue card in center

  const testimonials = [
    {
      id: 1,
      text: "We Have Gained Valuable Insight Into The Significant Work Ethiopia Has Done In Deploying AI For Research.",
      author: "Dr. Sarah Johnson",
      position: "Research Director",
      avatar: "/placeholder.svg?height=40&width=40",
      bgColor: "bg-orange-300",
    },
    {
      id: 2,
      text: "We Have Gained Valuable Insight Into The Significant Work Ethiopia Has Done In Deploying AI For Research.",
      author: "Prof. Michael Chen",
      position: "AI Research Lead",
      avatar: "/placeholder.svg?height=40&width=40",
      bgColor: "bg-orange-200",
    },
    {
      id: 3,
      text: "We Have Gained Valuable Insight Into The Significant Work Ethiopia Has Done In Deploying AI For Research, Development, And Implementation Within A Short Period.",
      author: "Ambassador Evgeny Terekhin",
      position: "Russian Ambassador to Ethiopia",
      avatar: "/placeholder.svg?height=40&width=40",
      bgColor: "bg-gradient-to-r from-blue-500 to-blue-300",
      isMain: true,
    },
    {
      id: 4,
      text: "We Have Gained Valuable Insight Into The Significant Work Ethiopia Has Done In Deploying AI For Research.",
      author: "Dr. Maria Rodriguez",
      position: "Technology Advisor",
      avatar: "/placeholder.svg?height=40&width=40",
      bgColor: "bg-orange-200",
    },
    {
      id: 5,
      text: "We Have Gained Valuable Insight Into The Significant Work Ethiopia Has Done In Deploying AI For Research.",
      author: "Prof. James Wilson",
      position: "Innovation Director",
      avatar: "/placeholder.svg?height=40&width=40",
      bgColor: "bg-orange-300",
    },
  ]

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
                    ${testimonial.isMain && isCenter ? "" : ""}
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
                        leading-relaxed mb-4
                        ${isCenter ? "text-base font-semibold" : "text-xs"}
                        ${testimonial.isMain && isCenter ? "" : " text-xs"}
                      `}
                    >
                      "{testimonial.text}"
                    </blockquote>

                    <div className="flex items-center space-x-3">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        className={`rounded-full object-cover ${isCenter ? "w-12 h-12 text-white" : "w-10 h-10"}`}
                      />
                      <div>
                        <p
                          className={`
                            font-semibold
                            ${isCenter ? "text-base font-bold text-white" : "text-gray-900 text-xs"}
                            ${testimonial.isMain && isCenter ? "" : " text-xs"}
                          `}
                        >
                          {testimonial.author}
                        </p>
                        <p
                          className={`
                            ${isCenter ? "text-sm" : "text-xs"}
                            ${testimonial.isMain && isCenter ? "text-blue-100" : "text-gray-600 text-xs"}
                          `}
                        >
                          {testimonial.position}
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
