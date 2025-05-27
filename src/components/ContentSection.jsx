const ContentSection = ({ title, subtitle, images, large = false }) => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Orange accent bar */}
          <div className="w-16 h-1 bg-orange-500 mx-auto mb-8"></div>
  
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          </div>
  
          <div className="max-w-6xl mx-auto">
            {large ? (
              <div className="grid gap-6">
                <img
                  src={images[0] || "/placeholder.svg"}
                  alt="AI Conference"
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={`/placeholder.svg?height=150&width=200`}
                      alt={`Event ${i}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
  
  export default ContentSection
  