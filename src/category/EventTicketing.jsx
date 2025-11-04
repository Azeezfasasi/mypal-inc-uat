import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import EventHero from '../assets/components/category-components/event-ticketing-components/EventHero'
import EventTicketCategory from '../assets/components/category-components/event-ticketing-components/EventTicketingCategory'
import { Helmet } from 'react-helmet'

function EventTicketing() {
  return (
      <>
      <Helmet>
        <title>Event Ticketing Services in Lagos | MyPal</title>
        <meta name="description" content="Discover top event ticketing services in Lagos with MyPal. Find and book tickets for concerts, shows, festivals, and corporate events easily." />
        <meta name="keywords" content="MyPal, event ticketing, Lagos, concerts, shows, festivals" />
        <link rel="canonical" href="https://www.mypal-inc.com/category/event-ticketing" />
      </Helmet>
      <EventHero />
      <EventTicketCategory />
      <FooterSection />
      </>
  )
}

export default EventTicketing