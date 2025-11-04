import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import PrivateCinemalHero from '../assets/components/category-components/event-ticketing-components/PrivateCinemalHero'
import PrivateCinemaList from '../assets/components/category-components/event-ticketing-components/PrivateCinemalList'
import { Helmet } from 'react-helmet'

export default function PrivateCinemal() {
  return (
    <>
      <Helmet>
        <title>Private Cinema Experiences | MyPal</title>
        <meta name="description" content="Discover exclusive private cinema experiences in Lagos with MyPal. Book your private screening today!" />
        <meta name="keywords" content="MyPal, private cinema, Lagos, exclusive experiences" />
        <link rel="canonical" href="https://www.mypal-inc.com/restaurant/privatecinemas" />
      </Helmet>
      <PrivateCinemalHero />
      <PrivateCinemaList subcategorySlug="Private Cinemas" />
      <FooterSection />
    </>
  )
}
