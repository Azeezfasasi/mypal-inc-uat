import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import DelicaciesHero from '../assets/components/category-components/restaurant-components/DelicaciesHero'
import { Helmet } from 'react-helmet-async'
import IconicLists from '../assets/components/category-components/restaurant-components/IconicList'

function LocalDelicacies() {
  return (
    <>
      <Helmet>
        <title>Iconic Delicacies | MyPal</title>
        <meta name="description" content="Discover the best iconic delicacies in Lagos with MyPal. Explore authentic Nigerian cuisine, read reviews, and find top-rated eateries." />
        <meta name="keywords" content="MyPal, iconic delicacies, Lagos, dining, food, reviews" />
        <link rel="canonical" href="https://www.mypal-inc.com/restaurant/iconicdelicacies" />
      </Helmet>
      <DelicaciesHero />
      <IconicLists subcategorySlug="Iconic Delicacies" />
      <FooterSection />
    </>
  )
}

export default LocalDelicacies