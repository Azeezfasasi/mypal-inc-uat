import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import FitnessAndGymHero from '../assets/components/category-components/salon-and-spa-component/FitnessAndGymHero'
import FitnessAndGymList from '../assets/components/category-components/salon-and-spa-component/FitnessAndGymList'
import { Helmet } from 'react-helmet'

export default function FitnessAndGym() {
  return (
    <>
      <Helmet>
        <title>Fitness & Gym Centers in Lagos | MyPal</title>
        <meta name="description" content="Discover the best fitness and gym centers in Lagos with MyPal. Find top-rated facilities, read reviews, and achieve your health goals." />
        <link rel="canonical" href="https://www.mypal.ng/beauty-and-health/fitness-and-gym" />
      </Helmet>
      <FitnessAndGymHero />
      <FitnessAndGymList subcategorySlug="Fitness & Gym" />
      <FooterSection />
    </>
  )
}
