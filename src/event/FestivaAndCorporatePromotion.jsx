import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import FestivalAndCorporateHero from '../assets/components/category-components/event-ticketing-components/FestivaAndCorporateHero'
import FestivalAndCorporateList from '../assets/components/category-components/event-ticketing-components/FestivaAndCorporateList'
import { Helmet } from 'react-helmet'

export default function FestivalAndCorporatePromotion() {
  return (
    <>
      <Helmet>
        <title>Festival and Corporate Promotion Services | MyPal</title>
        <meta name="description" content="Discover top festival and corporate promotion services on MyPal. Find event planners, promoters, and organizers to make your event a success." />
        <meta name="keywords" content="MyPal, festival promotion, corporate promotion, Lagos, event planning" />
        <link rel="canonical" href="https://www.mypal-inc.com/restaurant/festivals&corporatepromotions" />
      </Helmet>
      <FestivalAndCorporateHero />
      <FestivalAndCorporateList subcategorySlug="Festivals & Corporate Promotions" />
      <FooterSection />
    </>
  )
}
