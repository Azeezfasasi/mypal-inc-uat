import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ConcertAndShowsHero from '../assets/components/category-components/event-ticketing-components/ConcertAndShowHero'
import ConcertAndShowsList from '../assets/components/category-components/event-ticketing-components/ConcertAndShowsList'
import { Helmet } from 'react-helmet'

export default function ConcertAndShows() {
  return (
    <>
      <Helmet>
        <title>Concerts and Shows in Lagos | MyPal</title>
        <meta name="description" content="Discover the best concerts and shows in Lagos with MyPal. Find event details, venues, and ticket information for an unforgettable experience." />
        <link rel="canonical" href="https://www.mypal.ng/event/concerts-and-shows" />
      </Helmet>
      <ConcertAndShowsHero />
      <ConcertAndShowsList subcategorySlug="Concerts & Shows" />
      <FooterSection />
    </>
  )
}
