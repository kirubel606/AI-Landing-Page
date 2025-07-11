import React from 'react';
import { useTranslation } from 'react-i18next';

const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;

const CenterColumn = ({ featuredArticle, BASE_URL, techNews, CalendarIcon, formatDate, navigateToDetail }) => {
  const { i18n } = useTranslation();
  const isAmharic = i18n.language === 'am';

  // Filter out magazines from techNews
  const nonMagazineNews = techNews.filter(article => !article.magazine && !article.iframe );


  // Ensure the featured article is not a magazine either
  const validFeatured = featuredArticle && !featuredArticle.magazine && !featuredArticle.magazine &&
    (isAmharic ? featuredArticle.title_am?.trim() : featuredArticle.title?.trim())
    ? featuredArticle
    : nonMagazineNews.find(article =>
        isAmharic ? article.title_am?.trim() : article.title?.trim()
      );

  // If still no valid article, render nothing
  if (!validFeatured) return null;

  const displayTitle = isAmharic ? validFeatured.title_am : validFeatured.title;
  const displaySubtitle = isAmharic ? validFeatured.subtitle_am : validFeatured.subtitle;
  const displayCategory = isAmharic ? validFeatured.category_am : validFeatured.category;

  return (
    <div className="lg:col-span-2">
      <div
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer mb-8"
        onClick={() => navigateToDetail(validFeatured)}
      >
        <div className="relative">
          <img
            src={validFeatured.cover_image ? `${BASE_URL}${validFeatured.cover_image}` : PLACEHOLDER_IMAGE}
            alt={displayTitle}
            className="w-full h-[60vh] md:h-[90vh] object-cover"
            onError={(e) => {
              e.target.src = PLACEHOLDER_IMAGE;
            }}
          />
          <span className="absolute top-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
            {displayCategory}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center text-xs">
              <p className="text-orange-500 text-xs font-medium">
                {validFeatured.category?.name_am || validFeatured.category?.name}
              </p>
              /<span className="ml-1">{formatDate(validFeatured.created_at)}</span>
            </div>
            <h2 className="text-4xl mb-2 leading-tight font-serif font-extrabold">
              "{displayTitle}"
            </h2>
            <p className="text-sm opacity-90 mb-2">
              {displaySubtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterColumn;
