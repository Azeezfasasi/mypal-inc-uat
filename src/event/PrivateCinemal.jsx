import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import PrivateCinemalHero from '../assets/components/category-components/event-ticketing-components/PrivateCinemalHero'
import PrivateCinemaList from '../assets/components/category-components/event-ticketing-components/PrivateCinemalList'
import { Helmet } from 'react-helmet'

export default function PrivateCinemal() {
  return (
    <>
      <Helmet>
        <title>Private Cinema Experiences in Lagos | MyPal</title>
        <meta name="description" content="Discover exclusive private cinema experiences in Lagos with MyPal. Book your private screening today!" />
        <link rel="canonical" href="https://www.mypal.ng/event/privatecinemal" />
      </Helmet>
      <PrivateCinemalHero />
      <PrivateCinemaList />
      <FooterSection />
    </>
  )
}
