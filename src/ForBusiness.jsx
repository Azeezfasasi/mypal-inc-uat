import React from 'react'
import BusinessHeroSection from './assets/components/business-components/BusinessHeroSection'
import TrustedBy from './assets/components/business-components/TrustedBy'
import WhyMyPal from './assets/components/business-components/WhyMyPal'
import ExploreStudio from './assets/components/business-components/ExploreStudio'
import JoinMyPal from './assets/components/business-components/JoinMyPal'
import BusinessHowItWorks from './assets/components/business-components/BusinessHowItWorks'
import VideoImage from './assets/components/business-components/VideoImage'
import BusinessBlog from './assets/components/business-components/BusinessBlog'
import FooterSection from './assets/components/home-components/FooterSection'

function Business() {
  return (
    <>
    <BusinessHeroSection />
    <TrustedBy />
    <WhyMyPal />
    <ExploreStudio />
    <JoinMyPal />
    <BusinessHowItWorks />
    <VideoImage />
    <BusinessBlog />
    <FooterSection />
    </>
  )
}

export default Business