import React from 'react';
import blog1 from '../../images/blog1.svg';
import blog2 from '../../images/blog2.svg';
import blog3 from '../../images/blog3.svg';
import { Link } from 'react-router-dom';

const BusinessBlog = () => {
  const blogPosts = [
    {
      image: blog1,
      title: " How to Attract More Guests to Your Beach House",
      description: "We have got you covered, managing all your business offerings from the comfort of your portable devices....",
      link: "#"
    },
    {
      image: blog2,
      title: "How to Fill Your Lounge on a Thursday Night",
      description: "We have got you covered, managing all your business offerings from the comfort of your portable devices...",
      link: "#"
    },
    {
      image: blog3,
      title: "How to Attract More Guests to Your Beach House",
      description: "We have got you covered, managing all your business offerings from the comfort of your portable devices...",
      link: "#"
    },
    {
      image: blog2,
      title: "How to Fill Your Lounge on a Thursday Night",
      description: "We have got you covered, managing all your business offerings from the comfort of your portable devices...",
      link: "#"
    },
    {
      image: blog3,
      title: "How to Attract More Guests to Your Beach House",
      description: "We have got you covered, managing all your business offerings from the comfort of your portable devices...",
      link: "#"
    },
  ];

  return (
    <div className="w-full bg-white py-0 lg:py-2 px-0 md:px-0 flex flex-col items-center mb-8">
        {/* Section Title */}
        <div className="w-[90%] flex flex-row gap-[40px] items-center justify-start relative mt-0 mb-10 mx-auto">
            {/* Left Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px rotate-180"
            style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",
            borderImageSlice: 1,}}
            ></div>

            {/* Title */}
            <div className="text-[#000000] text-center md:text-left font-['DrukCyr-Medium',_sans-serif] text-[28px] md:text-[34px] lg:text-[54px] font-bold relative flex items-center justify-center md:justify-start mx-auto">
                MyPal Blog
            </div>

            {/* Right Gradient Line */}
            <div className="hidden md:block border-t border-solid shrink-0 md:w-[15%] lg:w-[20%] h-0 relative -mt-px" style={{borderImage: "linear-gradient(90deg, rgba(94,94,94,1) 0%, rgba(102,102,102,0.14) 100%)",borderImageSlice: 1,}}
            ></div>
        </div>

      {/* Blog Posts Slider Container */}
      <div className="relative w-full ">
        <div 
          className="flex space-x-6 overflow-x-auto snap-x snap-mandatory scroll-p-4 md:scroll-p-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogPosts.map((post, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-80 sm:w-96 snap-start bg-white rounded-2xl shadow-lg border border-gray-200"
            >
              {/* Post Image */}
              <div className="w-full aspect-video rounded-t-2xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Post Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-2xl font-medium text-[#000000] mb-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm font-normal">
                  {post.description}
                </p>
                <Link 
                  to={post.link} 
                  className="text-[#4D1402] text-xl font-normal underline"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessBlog;
