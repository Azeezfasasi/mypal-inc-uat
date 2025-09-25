import React from 'react';
import explorestudioimg from '../../images/explorestudioimg.svg'
import mobileflyer from '../../images/mobileflyer.svg'

const ExploreStore = () => {
  return (
    <>
    {/* Laptop flyer */}
    <div className='hidden w-[90%] md:flex items-center justify-center mx-auto'>
        <img src={explorestudioimg} alt="Explore Mypal Flyer" className='w-full flex items-center justify-center mx-auto' />
    </div>

    {/* Mobile flyer */}
    <div className='w-[90%] flex md:hidden items-center justify-center mx-auto'>
        <img src={mobileflyer} alt="Explore Mypal Flyer" className='w-full flex items-center justify-center mx-auto' />
    </div>
    </>
  );
};

export default ExploreStore;
