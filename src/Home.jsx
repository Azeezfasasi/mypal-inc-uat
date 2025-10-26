import React, { useEffect } from 'react'
import HeroSection from './assets/components/home-components/HeroSection'
import ExploreCategory from './assets/components/home-components/ExploreCategory'
import FeaturedExperiences from './assets/components/home-components/FeaturedExperiences'
import Faq from './assets/components/home-components/Faq'
import FooterSection from './assets/components/home-components/FooterSection'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router-dom'
import HomeBlog from './assets/components/home-components/HomeBlog'

function Home() {
  const location = useLocation();

  useEffect(() => {
    // If navigation requested a scroll target, try to scroll to it after mount
    const targetId = location?.state?.scrollTo;
    if (targetId) {
      // wait a tick for elements to render
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // retry a few times (in case of delayed rendering)
        let tries = 0;
        const id = setInterval(() => {
          tries += 1;
          const delayedEl = document.getElementById(targetId);
          if (delayedEl) {
            delayedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            clearInterval(id);
          } else if (tries > 10) {
            clearInterval(id);
          }
        }, 100);
      }
      // replace history state so it doesn't scroll again on future mounts
      try {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      } catch {
        // ignore
      }
    }
  }, [location]);
  return (
    <>
      <Helmet>
        <title>Home | MyPal</title>
        <meta name="description" content="Discover the best local services and experiences with MyPal. From dining and nightlife to outdoor activities and beauty, find it all in one place." />
        <meta name="keywords" content="MyPal, local services, experiences, dining, nightlife, outdoor activities, beauty, health, accommodation, mobility" />
        <meta name="author" content="MyPal" />
      </Helmet>
      <HeroSection />
      <ExploreCategory />
      <FeaturedExperiences />
      <Faq />
      <HomeBlog />
      <FooterSection />
    </>
  )
}

export default Home

