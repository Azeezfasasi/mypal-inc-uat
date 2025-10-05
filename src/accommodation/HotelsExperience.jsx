import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import HostelExperienceHero from '../assets/components/category-components/accommodation-component/HotelExperienceHero'
import HotelExperienceLists from '../assets/components/category-components/accommodation-component/HotelExperienceList'
import { Helmet } from 'react-helmet'

export default function HotelExperience() {
  return (
    <>
      <Helmet>
        <title>Hotel Experiences in Lagos | MyPal</title>
        <meta name="description" content="Discover exceptional hotel experiences in Lagos with MyPal. Explore top-rated hotels, read reviews, and book your stay with ease." />
        <link rel="canonical" href="https://www.mypal.ng/accommodation/hotelexperience" />
      </Helmet>
      <HostelExperienceHero />
      <HotelExperienceLists />
      <FooterSection />
    </>
  )
}
