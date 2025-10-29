import React from 'react'
import { Helmet } from 'react-helmet-async'
import FooterSection from '../assets/components/home-components/FooterSection'
import TermsAndConditionsPageComponent from '../assets/components/home-components/TermsAndConditionsPageComponent'
import ServicesHeader from '../assets/components/services-components/ServicesHeader'

export default function TermsAndConditions() {
  return (
    <>
    <Helmet>
        <title>Terms and Conditions | MyPal</title>
        <meta name="description" content="Read the terms and conditions for using MyPal services." />
        <meta name="keywords" content="MyPal, terms and conditions, user agreement" />
        <meta name="author" content="MyPal" />
        <link rel="canonical" href="https://www.mypal-inc.com/terms-and-conditions" />
    </Helmet>
    <ServicesHeader />
    <TermsAndConditionsPageComponent />
    <FooterSection />
    </>
  )
}
