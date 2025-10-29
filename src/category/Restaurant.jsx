import React from 'react'
import RestaurantHero from '../assets/components/category-components/restaurant-components/RestaurantHero'
import RestaurantCategory from '../assets/components/category-components/restaurant-components/RestaurantCategory'
import FooterSection from '../assets/components/home-components/FooterSection'
import { Helmet } from 'react-helmet-async'

function Restaurant() {
  return (
      <>
      <Helmet>
        <title>Restaurants | MyPal</title>
        <meta name="description" content="Discover the best restaurants in Lagos with MyPal. Explore a variety of cuisines, read reviews, and find your next dining experience." />
        <meta name="keywords" content="MyPal, restaurants, Lagos, dining, food, reviews" />
        <link rel="canonical" href="https://www.mypal-inc.com/category/restaurants" />
      </Helmet>
      <RestaurantHero />
      <RestaurantCategory />
      <FooterSection />
      </>
  )
}

export default Restaurant