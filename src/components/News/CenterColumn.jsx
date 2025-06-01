import React from 'react'

const CenterColumn = ({ featuredArticle, BASE_URL, techNews ,CalendarIcon, formatDate }) => {
  return (
    <>
              {/* Center Column - Featured Article */}
              <div className="lg:col-span-2">
            {featuredArticle && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer mb-8">
                <div className="relative">
                  <img
                    src={`${BASE_URL}`+featuredArticle.cover_image || "/placeholder.svg"}
                    alt={featuredArticle.title}
                    className="w-full h-80 object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/600x400"
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                    {featuredArticle.category}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h2 className="text-2xl font-bold mb-2 leading-tight">{featuredArticle.title}</h2>
                    <p className="text-sm opacity-90 mb-2">{featuredArticle.subtitle}</p>
                    <div className="flex items-center text-xs">
                      <CalendarIcon size="w-3 h-3" />
                      <span className="ml-1">{formatDate(featuredArticle.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tech News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {techNews.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img
                      src={`${BASE_URL}`+article.cover_image || "/placeholder.svg"}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200"
                      }}
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.subtitle}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <CalendarIcon size="w-3 h-3" />
                      <span className="ml-1">{formatDate(article.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </div>

    </>
  )
}

export default CenterColumn