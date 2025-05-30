const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ContentSection = ({ title, subtitle, images, large = false }) => {
  const getImageUrl = (img) => {
    if (typeof img !== 'string') return ''; // skip invalid types
    return img.startsWith('http') ? img : BASE_URL + img;
  };
  

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
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
              {/* Mobile: Large image first */}
              <div className="md:order-2 md:flex-2">
                {images[0] && (
                                  <img
                                  src={getImageUrl(images[0])}
                                  alt="AI Conference"
                                  className="w-full h-80 md:h-[410px] object-cover rounded-lg shadow-lg shadow-orange-300"
                                />
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
      </section>
    )
  }
  
  export default ContentSection
  