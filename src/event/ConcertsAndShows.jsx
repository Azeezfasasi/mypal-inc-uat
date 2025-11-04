import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ConcertAndShowsHero from '../assets/components/category-components/event-ticketing-components/ConcertAndShowHero'
import ConcertAndShowsList from '../assets/components/category-components/event-ticketing-components/ConcertAndShowsList'
import { Helmet } from 'react-helmet'

export default function ConcertAndShows() {
  return (
    <>
      <Helmet>
        <title>Concerts and Shows | MyPal</title>
        <meta name="description" content="Discover the best concerts and shows in Lagos with MyPal. Find event details, venues, and ticket information for an unforgettable experience." />
        <meta name="keywords" content="MyPal, concerts, shows, Lagos, event ticketing" />
        <link rel="canonical" href="https://www.mypal-inc.com/restaurant/concerts&shows" />
      </Helmet>
      <ConcertAndShowsHero />
      <ConcertAndShowsList subcategorySlug="Concerts & Shows" />
      <FooterSection />
    </>
  )
}
