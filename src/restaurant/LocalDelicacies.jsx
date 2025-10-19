import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import DelicaciesHero from '../assets/components/category-components/restaurant-components/DelicaciesHero'
import { Helmet } from 'react-helmet'
import IconicLists from '../assets/components/category-components/restaurant-components/IconicList'

function LocalDelicacies() {
  return (
    <>
      <Helmet>
        <title>Iconic Delicacies in Lagos | MyPal</title>
        <meta name="description" content="Discover the best iconic delicacies in Lagos with MyPal. Explore authentic Nigerian cuisine, read reviews, and find top-rated eateries." />
        <link rel="canonical" href="https://www.mypal.ng/restaurant/localdelicacies" />
      </Helmet>
      <DelicaciesHero />
      <IconicLists subcategorySlug="Iconic Delicacies" />
      <FooterSection />
    </>
  )
}

export default LocalDelicacies