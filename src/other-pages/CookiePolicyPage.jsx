import React from 'react'
import { Helmet } from 'react-helmet-async'
import FooterSection from '../assets/components/home-components/FooterSection'
import CookiePolicyPageComponent from '../assets/components/home-components/CookiePolicyPageComponent'
import ServicesHeader from '../assets/components/services-components/ServicesHeader'

export default function CookiePolicyPage() {
  return (
    <>
    <Helmet>
        <title>Cookie Policy | MyPal</title>
        <meta name="description" content="Learn about the cookies we use and your choices regarding cookie consent at MyPal." />
        <meta name="keywords" content="MyPal, cookie policy, cookies, consent" />
        <meta name="author" content="MyPal" />
        <link rel="canonical" href="https://www.mypal-inc.com/cookie-policy" />
    </Helmet>
    <ServicesHeader />
    <CookiePolicyPageComponent />
    <FooterSection />
    </>
  )
}
