import React from 'react'
import { Helmet } from 'react-helmet'
import MainHeader from '../assets/components/home-components/MainHeader'
import FooterSection from '../assets/components/home-components/FooterSection'
import TermsAndConditionsPageComponent from '../assets/components/home-components/TermsAndConditionsPageComponent'

export default function TermsAndConditions() {
  return (
    <>
    <Helmet>
        <title>Terms and Conditions | MyPal</title>
        <meta name="description" content="Read the terms and conditions for using MyPal services." />
        <meta name="keywords" content="MyPal, terms and conditions, user agreement" />
        <meta name="author" content="MyPal" />
    </Helmet>
    <div className='sticky top-0 z-50 bg-gray-500 mb-12 overflow-visible h-fit'>
      <MainHeader />
    </div>
    <TermsAndConditionsPageComponent />
    <FooterSection />
    </>
  )
}
