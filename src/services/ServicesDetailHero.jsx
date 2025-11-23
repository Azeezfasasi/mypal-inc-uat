import React, { useState, useEffect } from 'react';
import { X, MapPin, Star, StarHalf } from 'lucide-react';
// import servicestar from '../assets/images/servicestar.svg';
import star1 from '../assets/images/star1.svg';

// fallback in case no images
const fallbackImages = [
  'https://placehold.co/600x400/E5E7EB/6B7280?text=No+Image',
];

export default function ServicesDetailHero({ business }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [allImages, setAllImages] = useState([]);

  useEffect(() => {
    if (business) {
      const images = [business.image_url, ...(business.gallery_images || [])].filter(Boolean);
      setAllImages(images.length > 0 ? images : fallbackImages);
      setMainImage(images.length > 0 ? images[0] : fallbackImages[0]);
    }
  }, [business]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleThumbnailClick = (image) => setMainImage(image);

  if (!business) return <div className="text-center py-10">No business found.</div>;

  // Calculate average rating from reviews (if backend sends reviews array)
  const reviews = business.reviews || [];
  const avg =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : business.average_rating || 0;

  const rounded = Math.round(avg * 2) / 2; // round to nearest 0.5

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rounded)) {
        stars.push(<img key={i} src={star1} alt="star" className='w-7 md:w-10 h-7 md:h-10' />);
      } else if (i - 0.5 === rounded) {
        stars.push(<img key={i} src={star1} alt="star" className='w-7 md:w-10 h-7 md:h-10' />);
      } else {
        // stars.push(<Star key={i} className="w-7 md:w-10 h-7 md:h-10 text-gray-400" />);
      }
    }
    return stars;
  };

  // Number of thumbnails to display before "+X"
  const thumbnailsToShow = 4;
  const displayedThumbnails = allImages.slice(1, thumbnailsToShow + 1);
  const remainingImagesCount = allImages.length - (thumbnailsToShow + 1);

  return (
    <div className="w-[95%] bg-white py-3 md:py-6 font-sans antialiased mx-auto">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Image Section */}
        <div className="relative w-full h-[434px] rounded-3xl overflow-hidden shadow-xl mb-6">
          <img
            src={mainImage}
            alt={business.business_name}
            className="w-full h-full object-fill md:object-cover"
          />
          {/* Overlay content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 md:p-8">
            
            {/* ⭐ Rating and Reviews */}
            <div className="flex items-center space-x-2 text-white mb-2">
              {renderStars()}
              <span className="font-semibold text-[32px] ml-2">
                {rounded.toFixed(1)}
              </span>
              <span className="text-gray-300 text-[32px]">
                ({business.total_reviews || reviews.length || 0})
              </span>
            </div>

            {/* 📍 Location */}
            <div className="flex items-center space-x-2 text-white text-xl font-normal mb-2">
              <MapPin className="w-5 h-5 text-white" />
              <span>{business.address || "Location not specified"}</span>
            </div>

            {/* 🕒 Opening Hours */}
            {business.opening_hours && (
              <p className="text-white text-xl">
                <span className="text-[#23EE7F]">Open</span> {business.opening_hours}
              </p>
            )}
          </div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 md:gap-0">
          {displayedThumbnails.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(image)}
              className={`w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/5 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105 border-2 ${
                mainImage === image ? 'border-orange-500' : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="md:w-[324px] md:h-[130px] object-cover"
              />
            </button>
          ))}
          {remainingImagesCount > 0 && (
            <button
              onClick={openModal}
              className="w-1/4 sm:w-1/5 md:w-1/6 lg:w-1/6 relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-105"
            >
              <img
                src={allImages[thumbnailsToShow + 1]}
                alt="More images"
                className="w-full h-full object-cover filter brightness-50"
              />
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
                +{remainingImagesCount}
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl h-full bg-white rounded-xl shadow-lg overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white z-50 bg-gray-900 bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {allImages.map((image, index) => (
                <div key={index} className="rounded-xl overflow-hidden shadow-md">
                  <img
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
