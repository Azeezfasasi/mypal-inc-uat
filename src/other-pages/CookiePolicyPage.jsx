import React from 'react'
import { Helmet } from 'react-helmet'
import MainHeader from '../assets/components/home-components/MainHeader'
import FooterSection from '../assets/components/home-components/FooterSection'
import CookiePolicyPageComponent from '../assets/components/home-components/CookiePolicyPageComponent'
import CookieConsent from '../assets/components/home-components/CookieConsent'

export default function CookiePolicyPage() {
  return (
    <>
    <Helmet>
        <title>Cookie Policy | MyPal</title>
        <meta name="description" content="Learn about the cookies we use and your choices regarding cookie consent at MyPal." />
        <meta name="keywords" content="MyPal, cookie policy, cookies, consent" />
        <meta name="author" content="MyPal" />
    </Helmet>
    <MainHeader />
    <CookiePolicyPageComponent />
    <FooterSection />
    </>
  )
}
