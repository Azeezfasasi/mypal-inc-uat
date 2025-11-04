import React from 'react'
import { Helmet } from 'react-helmet'
import FooterSection from '../assets/components/home-components/FooterSection'
import ServicesHeader from '../assets/components/services-components/ServicesHeader'
import AccessibilityStatementComponent from '../assets/components/home-components/AccessibilityStatementComponent'

export default function AccessibilityStatement() {
  return (
    <>
    <Helmet>
        <title>Accessibility Statement | MyPal</title>
        <meta name="description" content="Learn about our commitment to accessibility at MyPal." />
        <meta name="keywords" content="MyPal, accessibility, statement" />
        <meta name="author" content="MyPal" />
        <link rel="canonical" href="https://www.mypal-inc.com/accessibility-statement" />
    </Helmet>
    <ServicesHeader />
    <AccessibilityStatementComponent />
    <FooterSection />
    </>
  )
}
