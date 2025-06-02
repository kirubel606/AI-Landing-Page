const BASE_URL = import.meta.env.VITE_API_BASE_URL;
import React,{useContext,useState} from "react"
import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react"


const ContentSection = ({ title, subtitle, images, large = false }) => {
  const getImageUrl = (img) => {
    if (typeof img !== 'string') return ''; // skip invalid types
    return img.startsWith('http') ? img : BASE_URL + img;
  };

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [lightboxImages, setLightboxImages] = useState([])
  console.log("Light Box:",lightboxImages);
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
  

    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Orange accent bar */}
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>
  
          <div className="text-center mb-12 w-[50%] justify-center items-center mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          </div>
  
          <div className="max-w-6xl mx-auto">
            {large ? (
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
              {/* Mobile: Large image first */}
              <div className="md:order-2 md:flex-2">
              {images[0] && (
                <div className="relative group">
                  <img
                    src={getImageUrl(images[0])}
                    alt="AI Conference"
                    className="w-full h-80 md:h-[410px] object-cover rounded-lg shadow-lg shadow-orange-300"
                  />
                  <button
                    onClick={() => {
                      const galleryImages = images.map((galleryImg) => galleryImg)
                      openLightbox(galleryImages, 0)
                    }}
                    className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-400"
                    aria-label="View full screen"
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              )}

              </div>

              {/* Left side - 2 smaller images */}
              <div className="flex flex-row md:flex-col gap-4 md:order-1 md:flex-1">
              {images[1] && (
                <img
                  src={getImageUrl(images[1])}
                  alt="Event 1"
                  className="w-full h-32 md:h-[240px] object-cover rounded-lg shadow-md shadow-orange-300"
                />
              )}
              {images[2] && (
                <img
                  src={getImageUrl(images[2])}
                  alt="Event 2"
                  className="w-full h-32 md:h-[150px] object-cover rounded-lg shadow-md shadow-orange-300"
                />
              )}
              </div>

              {/* Right side - 2 smaller images */}
              <div className="flex flex-row md:flex-col gap-4 md:order-3 md:flex-1">
              {images[3] && (
                <img
                  src={getImageUrl(images[3])}
                  alt="Event 3"
                  className="w-full h-32 md:h-[240px] object-cover rounded-lg shadow-md shadow-orange-300"
                />
              )}
              {images[4] && (
                <img
                  src={getImageUrl(images[4])}
                  alt="Event 4"
                  className="w-full h-32 md:h-[150px] object-cover rounded-lg shadow-md shadow-orange-300"
                />
              )}
              </div>
            </div>
            ) : (
                <div className="grid gap-6"> 
                {images[0] && (
                <img  src={getImageUrl(images[0])}alt="AI Conference" className="w-full h-96 object-cover rounded-lg shadow-lg shadow-orange-300" /> 
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-4"> 
                  {[1, 2, 3, 4].map((i) => (
                    images[i] && (
                    <img key={i}  src={getImageUrl(images[i])}alt={`Event ${i}`} className="w-full h-32 object-cover rounded-lg shadow-md shadow-orange-300" />
                    )  
                  ))} 
                    </div>
                </div>
            )}
          </div>
        </div>
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
      </section>
    )
  }
  
  export default ContentSection
  