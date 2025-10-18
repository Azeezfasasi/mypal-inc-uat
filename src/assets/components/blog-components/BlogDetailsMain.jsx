import React from 'react';

/**
 * Data structure for the blog post content
 */
const postData = {
  publishedDate: '20 Jan 2025',
  title: 'UX review presentations',
  excerpt: 'How do you create compelling presentations that wow your colleagues and impress your managers? Find out with our in-depth guide on UX presentations.',
  tags: ['Design', 'Research', 'Presentation'],
  imageUrl: 'https://placehold.co/1000x550/e0e0e0/333333?text=Delicious+Food', // Placeholder image URL
  sections: [
    {
      heading: 'Introduction',
      content: [
        'Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.',
        'Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.'
      ]
    },
    {
      heading: 'The Importance of Preparation',
      content: [
        'Adipiscing orci a, mattis eget ut interdum. Auctor id sed nulla facilisi cras. Velit euismod in pellentesque massa placerat. Aliquam vestibulum morbi blandit cursus risus at ultrices. Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec. At tellus at urna condimentum mattis pellentesque id nibh. In iaculis nunc sed augue lacus viverra vitae congue eu.',
        'Purus in massa tempor nec feugiat nisl pretium fusce. Sagittis nisl rhoncus mattis rhoncus urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Adipiscing commodo elit at imperdiet dui accumsan sit. Egestas integer eget aliquet nibh praesent tristique magna. Massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices.'
      ]
    }
  ]
};

/**
 * Standard React component to display the blog post details, matching the provided image.
 */
const BlogDetailsMain = () => {
  return (
    // Outer container for padding and background
    <div className="bg-white p-4 sm:p-8 md:p-12 font-['Inter'] min-h-screen">
      
      {/* Centered content area with maximum width for readability */}
      <div className="max-w-4xl mx-auto">
        
        {/* Date / Metadata */}
        <p className="text-center text-sm text-gray-500 mb-2">
          Published {postData.publishedDate}
        </p>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 px-2">
          {postData.title}
        </h1>

        {/* Excerpt / Subtitle */}
        <p className="text-center text-base sm:text-lg text-gray-600 mb-6 max-w-2xl mx-auto px-2">
          {postData.excerpt}
        </p>

        {/* Tags */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {postData.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full text-pink-700 bg-pink-100 hover:bg-pink-200 transition-colors cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Featured Image */}
        <div className="mb-10 w-full">
          <img
            src={postData.imageUrl}
            alt={postData.title}
            // Use w-full for responsiveness, rounded-xl for matching the image's style
            className="w-full h-auto object-cover rounded-xl shadow-lg border border-gray-100"
            style={{ maxHeight: '550px' }} // Constraint height for visual appeal
          />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg max-w-none">
          {postData.sections.map((section, index) => (
            <div key={index} className="mb-8">
              {/* Section Heading */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {section.heading}
              </h2>

              {/* Section Paragraphs */}
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 leading-relaxed mb-4 first-line:font-medium">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogDetailsMain;