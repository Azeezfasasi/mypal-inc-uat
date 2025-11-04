import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import FoodAndDrinkHero from '../assets/components/category-components/nightlife-components/FoodAndDrinkHero'
import FoodAndDrinkList from '../assets/components/category-components/nightlife-components/FoodAndDrinkList'
import { Helmet } from 'react-helmet'

export default function FoodAndDrink() {
  return (
    <>
      <Helmet>
        <title>Food and Drink | MyPal</title>
        <meta name="description" content="Discover the best food and drink spots in Lagos with MyPal. Explore top restaurants, bars, and cafes, read reviews, and find your next favorite place." />
        <meta name="keywords" content="MyPal, food and drink, Lagos, restaurants, bars, cafes" />
        <link rel="canonical" href="https://www.mypal-inc.com/nightlife/food&drinks" />
      </Helmet>
      <FoodAndDrinkHero />
      <FoodAndDrinkList subcategorySlug="Food & Drinks" />
      <FooterSection />
    </>
  )
}
