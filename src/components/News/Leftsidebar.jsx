import React from 'react'

const Leftsidebar = ({ leftColumnNews, BASE_URL, CalendarIcon, formatDate,navigateToDetail }) => {
        return (
            <>
            {/* Left Column - Small News Items */}
            <div className="lg:col-span-1 space-y-8 hidden md:block">
                {leftColumnNews.slice(0, 3).map((article) => (
                <div
                    key={article.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigateToDetail(article)}
                >
                    <div className="relative">
                    <img
                        src={`${BASE_URL}` + article.cover_image || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-28 object-cover"
                        onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200"
                        }}
                    />
                    <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                        {article.category}
                    </span>
                    </div>
                    <div className="p-4">
                    <h3 className="font-semibold text-sm leading-tight mb-2 line-clamp-3">{article.title}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                        <CalendarIcon size="w-3 h-3" />
                        <span className="ml-1">{formatDate(article.created_at)}</span>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </>
        )
    }

export default Leftsidebar
