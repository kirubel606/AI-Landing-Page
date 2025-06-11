import React from 'react'
import { convert } from 'html-to-text'
const MAX_LENGTH = 700; // Change this to however many characters you want
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE;
const getPreviewHTML = (html) => {
  const plainText = convert(html, {
    wordwrap: false,
    selectors: [
      { selector: 'img', format: 'skip' }, // skip images
    ],
  });

  const truncatedText = plainText.length > MAX_LENGTH
    ? plainText.slice(0, MAX_LENGTH) + '...'
    : plainText;

  return truncatedText;
};

const MajorNews = ({ majorNews, BASE_URL, CalendarIcon, PlayIcon,formatDate ,navigateToDetail}) => {
  return (
    <>
        {/* Major News Article */}
        {majorNews && (
          <div
            className="bg-white hidden md:block overflow-hidden transition-shadow  mt-6 cursor-pointer"
            onClick={() => navigateToDetail(majorNews)}
          >
            <div className="relative flex">
              <img
                src={`${BASE_URL}` + majorNews.cover_image || PLACEHOLDER_IMAGE}
                alt={majorNews.title}
                className="w-1/4 h-64 md:h-80 object-cover shadow-lg rounded-md shadow-orange-400"
                onError={(e) => {
                  e.target.src = PLACEHOLDER_IMAGE;
                }}
              />
              {majorNews.iframe && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <PlayIcon size="w-6 h-6" />
                  </div>
                </div>
              )}
              <span className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                {majorNews.category}
              </span>
              <div className="px-6 trancate ">
                <div className="flex items-center text-xs">
              <p className="text-orange-500  text-xs font-medium">{majorNews.category} </p>/<span className="ml-1">{formatDate(majorNews.created_at)}</span>
</div>
                <h2 className="text-2xl font-bold mb-4 leading-tight">{majorNews.title}</h2>
                {/* <p className="text-gray-600 mb-4">{majorNews.subtitle}</p> */}
                <p className='text-justify font-serif'>{getPreviewHTML(majorNews.content)}</p>

                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon size="w-3.5 h-3.5" />
                  <span className="ml-1">{formatDate(majorNews.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default MajorNews


