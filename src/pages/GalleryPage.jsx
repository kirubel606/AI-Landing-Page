"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { AnimatePresence, motion } from "framer-motion";

import { X, ChevronLeft, ChevronRight, Maximize } from "lucide-react"
import { useTranslation } from 'react-i18next';

import CoolSvg from "../components/CoolSVg";
import Footer from "../components/Footer";
import SocialMediaLinks from "../components/SocialMediaLinks";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const PLACEHOLDER_IMAGE = import.meta.env.VITE_PLACEHOLDER_IMAGE || "/placeholder.svg";
const filters = ['ALL', 'DATA CENTER', 'SHOWROOM', 'SUMMER CAMP', 'MOU'];

Modal.setAppElement('#root');

const ITEMS_PER_PAGE = 12;  // You can adjust this as you like

const GalleryPage = () => {
  const { t , i18n } = useTranslation();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}/gallery/`)
      .then((res) => res.ok ? res.json() : Promise.reject("Failed"))
      .then((data) => {
        setGalleryItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.toString());
        setLoading(false);
      });
  }, []);

  // Reset to page 1 whenever filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  // Filter gallery by activeFilter
  const filteredItems = activeFilter === 'ALL'
    ? galleryItems
    : galleryItems.filter(item =>
        item.title.toUpperCase().includes(activeFilter)
      );

  // Flatten images with gallery reference
  const flatImages = filteredItems.flatMap(gallery =>
    gallery.images.map(img => ({
      ...img,
      galleryTitle: gallery.title,
      galleryCaption: gallery.caption,
      galleryId: gallery.id,
    }))
  );

  // Pagination calculations
  const totalPages = Math.ceil(flatImages.length / ITEMS_PER_PAGE);

  // Get items for current page
  const pagedImages = flatImages.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Pagination helper to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional scroll to top
  };
const navigateImage = (direction) => {
  setCurrentImageIndex((prevIndex) => {
    let newIndex = prevIndex + direction;
    if (newIndex < 0) {
      newIndex = 0; // or wrap around: lightboxImages.length - 1
    } else if (newIndex >= lightboxImages.length) {
      newIndex = lightboxImages.length - 1; // or wrap around: 0
    }
    return newIndex;
  });
};

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

  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % lightboxImages.length);

  // Replace filter labels with translation keys
  const filterLabels = [
    t('all'),
    t('data_center'),
    t('showroom'),
    t('summer_camp'),
    t('mou')
  ];



  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="min-h-[30vh] md:min-h-[50vh] bg-gray-900 relative overflow-hidden">
        <CoolSvg />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-orange-400">{t('gallery')}</span>
            </h1>
            <p className="text-xl">{t('advancing_innovation')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 mb-10 sm:px-6 lg:px-8">
        <SocialMediaLinks />
        {/* Filters */}
        <div className="flex justify-center mt-10 mb-8">
          <div className="flex flex-wrap justify-center gap-2 bg-white rounded-lg p-2 shadow-sm">
            {filterLabels.map((filter, idx) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filters[idx])}
                className={`px-6 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  activeFilter === filters[idx]
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Loading/Error */}
        {loading && <p className="text-center text-gray-700">{t('loading_galleries')}</p>}
        {error && <p className="text-center text-red-600">{t('error_gallery')}: {error}</p>}

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {pagedImages.map((img, iIndex) => (
              <motion.div
                layout
                key={`${img.galleryId}-${img.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                onClick={() => openLightbox(pagedImages, iIndex)}
              >
                <div>
                <img
                  src={img.image || PLACEHOLDER_IMAGE}
                  alt={
  i18n.language === 'am' && img.galleryTitle_am
    ? img.galleryTitle_am
    : img.galleryTitle
}

                  
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                onClick={() => openLightbox([`${img.image}`])}
                className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-orange-400"
                aria-label={t('view_full_screen')}
              >
                <Maximize size={20} />
              </button>
              </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-center items-start p-6 text-white">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="text-xl font-bold mb-2">{i18n.language === 'am' ? img.galleryTitle_am : img.galleryTitle}</h3>
                    <p className="text-sm">{i18n.language === 'am' ? img.galleryCaption_am : img.galleryCaption}</p>
                    
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Items */}
        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">
            {t('no_items_found')}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-8">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {getPageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === "number" && onPageChange(page)}
                disabled={page === "..."}
                className={`px-3 py-2 rounded border text-sm ${
                  page === currentPage
                    ? "bg-sky-950 text-white border-sky-950"
                    : page === "..."
                      ? "border-transparent cursor-default"
                      : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {/* <Modal
        isOpen={lightboxOpen}
        onRequestClose={closeLightbox}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        <button className="absolute top-6 right-6 text-white" onClick={closeLightbox}>
          <X size={32} />
        </button>
        {lightboxImages.length > 0 && (
          <div className="flex items-center gap-6 w-full justify-center px-4">
            <button onClick={prevImage} className="text-white">
              <ChevronLeft size={48} />
            </button>
            <img
              src={lightboxImages[currentIndex]?.image}
              alt="Fullscreen view"
              className="max-h-[80vh] max-w-full object-contain"
            />
            <button onClick={nextImage} className="text-white">
              <ChevronRight size={48} />
            </button>
          </div>
        )}
      </Modal> */}
{lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-orange-400 transition-colors z-10"
              aria-label={t('close_lightbox')}
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
  // src={lightboxImages[currentImageIndex] || "/placeholder.svg"}
  src={lightboxImages[currentImageIndex].image || "/placeholder.svg"}

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
                  aria-label={t('previous_image')}
                >
                  <ChevronLeft size={40} />
                </button>
                <button
                  onClick={() => navigateImage(1)}
                  disabled={currentImageIndex === lightboxImages.length - 1}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-400 transition-colors ${
                    currentImageIndex === lightboxImages.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label={t('next_image')}
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default GalleryPage;
