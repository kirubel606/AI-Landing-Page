import React from 'react';
import { useTranslation } from 'react-i18next';

const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;

const CenterColumn = ({ featuredArticle, BASE_URL, techNews, CalendarIcon, formatDate, navigateToDetail }) => {
  const { t, i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';

  return (
    <>
      {/* Center Column - Featured Article */}
      <div className="lg:col-span-2">
        {featuredArticle && (
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer mb-8"
            onClick={() => navigateToDetail(featuredArticle)}
          >
            <div className="relative">
              <img
                src={featuredArticle.cover_image ? `${BASE_URL}${featuredArticle.cover_image}` : PLACEHOLDER_IMAGE}
                alt={i18n.language === 'am' ? featuredArticle.title_am : featuredArticle.title}
                
                className="w-full h-[60vh] md:h-[90vh] object-cover"
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
              />
              <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                {i18n.language === 'am' ? featuredArticle.category_am : featuredArticle.category}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center text-xs">
                  <p className="text-orange-500 text-xs font-medium">
                    {featuredArticle.category?.name_am || featuredArticle.category?.name}
                    
                  </p>
                  /<span className="ml-1">{formatDate(featuredArticle.created_at)}</span>
                </div>
                <h2 className="text-4xl mb-2 leading-tight font-serif font-extrabold">
                  "{isAmharic ? featuredArticle.title_am : featuredArticle.title}"
                </h2>
                <p className="text-sm opacity-90 mb-2">
                  {isAmharic ? featuredArticle.subtitle_am : featuredArticle.subtitle}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CenterColumn;
