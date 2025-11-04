import React from 'react'
import { Helmet } from 'react-helmet'
import FooterSection from '../assets/components/home-components/FooterSection'
import PrivacyPolicyComponent from '../assets/components/home-components/PrivacyPolicyComponent'
import ServicesHeader from '../assets/components/services-components/ServicesHeader'

export default function PrivacyPolicy() {
  return (
    <>
    <Helmet>
        <title>Privacy Policy | MyPal</title>
        <meta name="description" content="Read the privacy policy for using MyPal services." />
        <meta name="keywords" content="MyPal, privacy policy, user agreement" />
        <meta name="author" content="MyPal" />
        <link rel="canonical" href="https://www.mypal-inc.com/privacy-policy" />
    </Helmet>
    <ServicesHeader />
    <PrivacyPolicyComponent />
    <FooterSection />
    </>
  )
}
