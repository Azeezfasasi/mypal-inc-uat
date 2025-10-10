import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import BuffetFilter from '../assets/components/category-components/restaurant-components/BuffetFilter'
import BuffetLists from '../assets/components/category-components/restaurant-components/BuffetList'
import DelicaciesHero from '../assets/components/category-components/restaurant-components/DelicaciesHero'
import { Helmet } from 'react-helmet'

function LocalDelicacies() {
  return (
    <>
      <Helmet>
        <title>Local Delicacies in Lagos | MyPal</title>
        <meta name="description" content="Discover the best local delicacies in Lagos with MyPal. Explore authentic Nigerian cuisine, read reviews, and find top-rated eateries." />
        <link rel="canonical" href="https://www.mypal.ng/restaurant/localdelicacies" />
      </Helmet>
      <DelicaciesHero />
      {/* <BuffetFilter /> */}
      <BuffetLists />
      <FooterSection />
    </>
  )
}

export default LocalDelicacies