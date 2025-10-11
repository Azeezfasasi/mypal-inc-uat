import React from 'react'
import { Helmet } from 'react-helmet'
import MainHeader from '../assets/components/home-components/MainHeader'
import FooterSection from '../assets/components/home-components/FooterSection'
import PrivacyPolicyComponent from '../assets/components/home-components/PrivacyPolicyComponent'

export default function PrivacyPolicy() {
  return (
    <>
    <Helmet>
        <title>Privacy Policy | MyPal</title>
        <meta name="description" content="Read the privacy policy for using MyPal services." />
        <meta name="keywords" content="MyPal, privacy policy, user agreement" />
        <meta name="author" content="MyPal" />
    </Helmet>
    <div className='sticky top-0 z-50 bg-gray-500 mb-12 overflow-visible h-fit'>
      <MainHeader />
    </div>
    <PrivacyPolicyComponent />
    <FooterSection />
    </>
  )
}
