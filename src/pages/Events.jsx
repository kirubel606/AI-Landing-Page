"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CoolSvg from "../components/CoolSVg"
import Footer from "../components/Footer"
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

const BASE_URL = import.meta.env.VITE_API_BASE_URL 

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const eventsPerPage = 3

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/events/`)
      const data = await response.json()

      if (data) {
        setEvents(data)
      }
    } catch (err) {
      setError("Failed to fetch events")
      console.error("Error fetching events:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()
    return `${day} ${month}, ${year}`
  }

  const calculateDaysLeft = (dateString) => {
    const eventDate = new Date(dateString)
    const today = new Date()
    
    // Reset time part for accurate day calculation
    eventDate.setHours(0, 0, 0, 0)
    today.setHours(0, 0, 0, 0)
    
    const diffTime = eventDate - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return diffDays
  }

  // Pagination
  const indexOfLastEvent = currentPage * eventsPerPage
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent)
  const totalPages = Math.ceil(events.length / eventsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Events</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchEvents}
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <div className="min-h-[30vh] md:min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <div className="absolute h-dvh w-full">
          <CoolSvg />
        </div>
        <div className="relative h-full bg-transparent container mx-auto px-4 py-12 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-6xl text-white xl:text-7xl font-bold mt-[45%] mb-4 leading-tight">Events</h1>
            <div className="w-24 h-1 bg-orange-400 mx-auto"></div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-32 py-16">
        {currentEvents.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Events Found</h2>
            <p className="text-gray-600">Check back later for upcoming events.</p>
          </div>
        ) : (
          <div className="space-y-24">
            {currentEvents.map((event, index) => {
              const isEven = index % 2 === 0
              const daysLeft = calculateDaysLeft(event.timestamp)
              
              return (
                <div key={event.id} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                  {/* Event Info */}
                  <div className="md:w-1/2 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
                        {formatDate(event.timestamp)}
                      </span>
                      
                      {event.is_live && (
                        <span className="flex items-center gap-1 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                          <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                          <span>Is Going Live</span>
                        </span>
                      )}
                      
                      {!event.is_live && daysLeft > 0 && (
                        <span className="flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                          <Clock size={14} />
                          <span>{daysLeft} Days Left</span>
                        </span>
                      )}
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h2>
                    
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin size={16} className="mr-2" />
                      <span>{event.location}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6 line-clamp-4">{event.description}</p>
                    
                    <div className="flex items-center gap-4">
                      {event.is_live ? (
                        <a 
                          href={event.video_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          Watch Live
                        </a>
                      ) : (
                        <a 
                          href={event.video_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                        >
                          Book Event
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Event Images */}
                  <div className="md:w-1/2">
                    <div className="relative rounded-lg overflow-hidden shadow-lg mb-4">
                      <img 
                        src={event.image || "/placeholder.svg"} 
                        alt={event.title} 
                        className="w-full h-80 object-cover"
                        onError={(e) => {
                          e.target.src = "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg"
                        }}
                      />
                      {event.is_live && (
                        <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                          LIVE
                        </div>
                      )}
                    </div>
                    
                    {/* Thumbnail Images - These would typically come from the API but we're using placeholders */}
                    {/* <div className="grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((num) => (
                        <div key={num} className="rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={`https://via.placeholder.com/300x200?text=Gallery+${num}`} 
                            alt={`${event.title} gallery ${num}`} 
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      ))}
                    </div> */}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-16">
            <nav className="flex items-center gap-2">
              <button 
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronLeft size={16} />
              </button>
              
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-md ${
                    currentPage === i + 1
                      ? 'bg-indigo-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <ChevronRight size={16} />
              </button>
            </nav>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

export default Events
