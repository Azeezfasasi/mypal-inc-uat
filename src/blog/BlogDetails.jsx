import React from 'react'
import ServicesHeader from '../assets/components/services-components/ServicesHeader'
import FooterSection from '../assets/components/home-components/FooterSection'
import { Helmet } from 'react-helmet'
import BlogDetailsMain from '../assets/components/blog-components/BlogDetailsMain'

export default function BlogDetails() {
  return (
    <>
    <Helmet>
        <title>Blog Details | MyPal</title>
        <meta name="description" content="Detailed blog post on MyPal covering various topics to help you enhance your business and lifestyle." />
        <meta name="keywords" content="MyPal, Blog, Business Tips, Lifestyle, Hospitality, Travel, Accommodation, Mobility, Outdoor Activities" />
        <meta name="author" content="MyPal Team" />
        <link rel="canonical" href="https://mypal.co//blog-details" />
    </Helmet>
    <ServicesHeader />
    <BlogDetailsMain />
    <FooterSection />
    </>
  )
}
