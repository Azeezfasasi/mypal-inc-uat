import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import HouseholdHero from '../assets/components/category-components/mobility-components/HouseholdHero'
import HouseholdLists from '../assets/components/category-components/mobility-components/HouseholdLists'
import { Helmet } from 'react-helmet'

function HouseholdLogistics() {
  return (
    <>
      <Helmet>
        <title>Household Logistics Services | MyPal</title>
        <meta name="description" content="Discover reliable household logistics services in Lagos with MyPal. From moving to storage solutions, find trusted providers to handle your household needs." />
        <meta name="keywords" content="MyPal, household logistics, Lagos, moving services, storage solutions, reviews" />
        <link rel="canonical" href="https://www.mypal-inc.com/mobility/householdlogistics" />
      </Helmet>
      <HouseholdHero />
      <HouseholdLists subcategorySlug="Household Logistics" />
      <FooterSection />
    </>
  )
}

export default HouseholdLogistics