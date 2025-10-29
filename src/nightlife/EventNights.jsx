import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import { Helmet } from 'react-helmet-async'
import EventNightHero from '../assets/components/category-components/nightlife-components/EventNightHero'
import EventNightList from '../assets/components/category-components/nightlife-components/EventNightList'

export default function EventNights() {
  return (
    <>
      <Helmet>
        <title>Event Nights | MyPal</title>
        <meta name="description" content="Experience the best of Lagos nightlife with MyPal. Discover luxury clubs, bars, and events for an unforgettable night out." />
        <meta name="keywords" content="Lagos nightlife, event nights, clubs, bars, MyPal" />
        <link rel="canonical" href="https://www.mypal-inc.com/nightlife/eventsnights" />
      </Helmet>
      <EventNightHero />
      <EventNightList subcategorySlug="Events Nights" />
      <FooterSection />
    </>
  )
}
