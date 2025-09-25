import React from 'react'
import FooterSection from '../assets/components/home-components/FooterSection'
import ServiceDetailTitle from '../assets/components/home-components/ServiceDetailTitle'
import ServicesDetailHero from './ServicesDetailHero'
import ServiceDetailDescription from './ServiceDetailDescription'
import ServicesHeader from '../assets/components/services-components/ServicesHeader'

function ServiceDetails() {
  return (
      <>
          <ServicesHeader />
          <ServiceDetailTitle />
          <ServicesDetailHero />
          <ServiceDetailDescription />
          <FooterSection />
      </>
  )
}

export default ServiceDetails