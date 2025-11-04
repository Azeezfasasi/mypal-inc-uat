import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BoatYatchHero from '../assets/components/category-components/outdoor-components/BoatYatchHero'
import BoatLists from '../assets/components/category-components/outdoor-components/BoatLists'
import { Helmet } from 'react-helmet'

function BoatsYatch() {
  return (
    <>
      <Helmet>
        <title>Boat, Yacht & Cruises around you | MyPal</title>
        <meta name="description" content="Explore premium boat and yacht rentals in Lagos with MyPal. Discover top-rated services, read reviews, and book your perfect maritime experience today." />
        <meta name="keywords" content="MyPal, boat rentals, yacht rentals, Lagos, cruises, maritime experience" />
        <link rel="canonical" href="https://www.mypal-inc.com/outdooractivities/boat&yachtcruises" />
      </Helmet>
      <BoatYatchHero />
      <BoatLists subcategorySlug="Boat & Yacht Cruises" />
      <FooterSection />
    </>
  )
}

export default BoatsYatch