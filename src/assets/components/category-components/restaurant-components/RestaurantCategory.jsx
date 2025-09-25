import React from 'react';
import { Link } from 'react-router-dom';
import finediningnew from '../../../images/finediningnew.jpg'
import buffetnew from '../../../images/buffetnew.jpg'
// import iconicnew from '../../../images/iconicnew.jpg'
import iconnicimg from '../../../images/iconnicimg.png'

// Main component that contains all the cards
export default function RestaurantCategory() {
  const categories = [
    {
      title: 'FINE DINING',
      image: finediningnew,
      alt: 'A classy restaurant interior with hanging lights and a bar.',
      link: '/restaurant/finedining',
    },
    {
      title: 'BUFFET SERVICES',
      image: buffetnew,
      alt: 'A bustling scene of people enjoying a buffet.',
      link: '/restaurant/buffetservices',
    },
    {
      title: 'ICONIC DELICACIES & DRINKS',
      image: iconnicimg,
      alt: 'A vibrant disco ball with two cocktail glasses in the foreground.',
      link: '/restaurant/localdelicacies',
    },
  ];

  return (
    <div className="bg-white flex items-center justify-center p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center space-y-6 lg:space-y-0 lg:space-x-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="relative w-full h-[300px] md:h-[563px] max-w-sm overflow-hidden rounded-[10px] shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105">
              {/* Image with a dark overlay */}
                <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-cover rounded-[20px]"
                />

              {/* Text centered on the card */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h2 className="text-white text-3xl sm:text-4xl font-extrabold text-center tracking-wide leading-tight drop-shadow-lg">
                  {category.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
