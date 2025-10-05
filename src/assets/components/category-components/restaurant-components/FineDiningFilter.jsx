import React, { useState, useRef, useEffect } from 'react';

// Main component that renders the scrollable category list
export default function FineDiningFilter({ selectedFilter = 'All', onChange = () => {} }) {
  const categories = [
    { name: 'All', icon: null },
    { name: 'Chinese', icon: null },
    { name: 'Italian', icon: null },
    { name: 'Mexican', icon: null },
    { name: 'Indian', icon: null },
    { name: 'American', icon: null },
    { name: 'Asian', icon: null },
    { name: 'French', icon: null },
    { name: 'Lebanese', icon: null },
    { name: 'Nigerian', icon: null },
    { name: 'Continental', icon: null },
    { name: 'African', icon: null },
    { name: 'Egyptian', icon: null },
    { name: 'Spanish', icon: null },
    { name: 'Brazilian', icon: null },
    { name: 'Greek', icon: null },
    { name: 'Caribbean', icon: null },
    { name: 'Oriental', icon: null },
  ];
  const [activeCategory, setActiveCategory] = useState(selectedFilter);
  const scrollContainerRef = useRef(null);

  // Function to handle horizontal scrolling with mouse wheel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // Check if the scroll direction is horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener('wheel', handleWheel);
    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    setActiveCategory(selectedFilter);
  }, [selectedFilter]);

  return (
    <div className="flex justify-center items-center py-4 bg-white">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto overflow-y-hidden scrollbar-hide space-x-2 px-4 py-2 w-full lg:w-[95%]"
        style={{
          '-webkit-overflow-scrolling': 'touch',
          scrollbarWidth: 'none', /* For Firefox */
        }}
      >
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveCategory(category.name);
              onChange(category.name);
            }}
            className={`flex-shrink-0 flex flex-row items-center justify-center p-2.5 rounded-[20px] border border-solid border-gray-300 cursor-pointer transition-all duration-300 gap-2.5 relative z-50
              ${activeCategory === category.name
                ? 'bg-[#DB3A06] text-[#ffffff] border-black'
                : 'bg-white text-[#000000] border-gray-300 hover:border-[#DB3A06]'
              }`}
          >
            {category.icon && <span className="mr-2">{category.icon}</span>}
            <span className="text-based font-normal whitespace-nowrap">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
