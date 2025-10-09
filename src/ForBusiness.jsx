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
import { Helmet } from 'react-helmet'
import VideoPlayCard from './assets/components/business-components/VideoPlayCard'

function Business() {
  return (
    <>
    <Helmet>
      <title>For Business | MyPal</title>
      <meta name="description" content="Join MyPal to elevate your business presence. Connect with customers, showcase your services, and grow your brand with our comprehensive business solutions." />
      <link rel="canonical" href="https://www.mypal.ng/for-business" />
    </Helmet>
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