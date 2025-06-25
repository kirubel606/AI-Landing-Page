import React from 'react'
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;
import { useTranslation } from 'react-i18next'

const Leftsidebar = ({ leftColumnNews, BASE_URL, CalendarIcon, formatDate, navigateToDetail }) => {
      const { i18n, t } = useTranslation();
    return (
        <>
            {/* Left Column - Small News Items */}
            <div className="lg:col-span-1 space-y-8 hidden md:block">
                {leftColumnNews.slice(0, 3).map((article) => (
                    <div
                        key={article.id}
                        className="bg-white rounded-lg shadow-md h-64 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col"
                        onClick={() => navigateToDetail(article)}
                    >
                        <div className="relative h-[80%]">
                            <img
                                src={article.cover_image ? `${BASE_URL}${article.cover_image}` : "/placeholder.svg"}
                                alt=  {i18n.language === 'am' ? article.title_am : article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = PLACEHOLDER_IMAGE
                                }}
                            />
                            <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                                {i18n.language === 'am' ? article.category_am : article.category}
                            </span>
                        </div>
                        <div className="p-2 h-[20%] flex flex-col justify-between">
                            <h3 className="font-semibold text-sm leading-tight line-clamp-2">  {i18n.language === 'am' ? article.title_am : article.title}</h3>
                            <div className="flex items-center text-xs text-gray-500 mt-1">
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
