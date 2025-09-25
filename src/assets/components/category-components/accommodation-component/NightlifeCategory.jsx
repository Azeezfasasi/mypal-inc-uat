import React from 'react';
import { Link } from 'react-router-dom';
import finediningimg from '../../../images/finediningimg.svg'
import buffetimg from '../../../images/buffetimg.svg'
import delicaciesimg from '../../../images/delicaciesimg.svg'
import games from '../../../images/games.svg'
import latenightdining from '../../../images/latenightdining.svg'
// import liveentertainment from '../../../images/liveentertainment.svg'
import luxury from '../../../images/luxury.svg'

// Main component that contains all the cards
export default function NightLifeCategory() {
  const categories = [
    {
      title: 'BARS & LOUNGES',
      image: finediningimg,
      alt: 'A classy restaurant interior with hanging lights and a bar.',
      link: '/category/nightlife',
    },
    {
      title: 'OUTDOOR NIGHTLIFE',
      image: buffetimg,
      alt: 'A bustling scene of people enjoying a buffet.',
      link: '/category/nightlife',
    },
    {
      title: 'CLUBBING & RESERVATIONS',
      image: delicaciesimg,
      alt: 'A vibrant disco ball with two cocktail glasses in the foreground.',
      link: '/category/nightlife',
    },
    {
      title: 'GAMES & ALTERNATIVE NIGHTS',
      image: games,
      alt: 'A vibrant disco ball with two cocktail glasses in the foreground.',
      link: '/category/nightlife',
    },
    {
      title: 'LATE NIGHT DINING',
      image: latenightdining,
      alt: 'A vibrant disco ball with two cocktail glasses in the foreground.',
      link: '/category/nightlife',
    },
    {
      title: 'Luxury & Chills Night',
      image: luxury,
      alt: 'A vibrant disco ball with two cocktail glasses in the foreground.',
      link: '/category/nightlife',
    },
  ];

  return (
    <div className="bg-white flex items-center justify-center p-4 sm:p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center gap-4 space-y-6 lg:space-y-0 lg:space-x-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="bg-[rgba(0,0,0,0.40)] relative w-full h-[300px] md:h-[563px] max-w-sm overflow-hidden rounded-[10px] shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105"
            >
              {/* Image with a dark overlay */}
                <img
                    src={category.image}
                    alt={category.alt}
                    className="w-full h-full object-cover rounded-[20px]"
                />

              {/* Text centered on the card */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <h2 className="text-white text-3xl sm:text-4xl font-extrabold text-center drop-shadow-lg">
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
