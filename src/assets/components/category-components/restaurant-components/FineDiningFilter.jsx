import React, { useState, useRef, useEffect } from 'react';

// Main component that renders the scrollable category list
export default function FineDiningFilter() {
  const categories = [
    { name: 'All', icon: null },
    { name: 'Open', icon: null },
    { name: 'Offers Delivery', icon: null },
    { name: 'Offers Takeout', icon: null },
    { name: 'Chinese', icon: null },
    { name: 'Indian', icon: null },
    { name: 'Asian', icon: null },
    { name: 'Greek', icon: null },
    { name: 'Continental', icon: null },
    { name: 'Arabian', icon: null },
    { name: 'Mexican', icon: null },
    { name: 'Brazilian', icon: null },
    { name: 'Buffet Offering', icon: null },
    { name: 'African Delicacies', icon: null },
  ];

  const [activeCategory, setActiveCategory] = useState('All');
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
            onClick={() => setActiveCategory(category.name)}
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
