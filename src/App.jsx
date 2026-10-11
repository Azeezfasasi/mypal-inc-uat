import React, { Suspense, lazy } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { Commet } from "react-loading-indicators"
import './App.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import ScrollToTop from "./assets/components/ScrollToTop"
import CookieConsent from "./assets/components/home-components/CookieConsent";

// Pages are loaded on demand so visitors don't download the whole site up front
const Home = lazy(() => import("./Home"))
const ServiceDetails = lazy(() => import("./services/ServiceDetails"))
const Restaurant = lazy(() => import("./category/Restaurant"))
const FineDining = lazy(() => import("./restaurant/FineDining"))
const BuffetServices = lazy(() => import("./restaurant/BuffetServices"))
const LocalDelicacies = lazy(() => import("./restaurant/LocalDelicacies"))
const MainStream = lazy(() => import("./restaurant/MainStream"))
const Mobility = lazy(() => import("./category/Mobility"))
const InCityRides = lazy(() => import("./mobility/InCityRides"))
const LuxuryRides = lazy(() => import("./mobility/LuxuryRides"))
const HouseholdLogistics = lazy(() => import("./mobility/HouseholdLogistics"))
const OutdoorActivities = lazy(() => import("./category/OutdoorActivities"))
const ParksRecreation = lazy(() => import("./outdooractivities/ParksRecreation"))
const BoatsYatch = lazy(() => import("./outdooractivities/BoatsYatch"))
const BeachesResorts = lazy(() => import("./outdooractivities/BeachesResorts"))
const Accommodation = lazy(() => import("./category/Accommodation"))
const ShortLets = lazy(() => import("./accommodation/Shortlets"))
const BeachesResortAccommodation = lazy(() => import("./accommodation/BeachesResortAccommodation"))
const HotelExperience = lazy(() => import("./accommodation/HotelsExperience"))
const BeautyHealth = lazy(() => import("./category/BeautyHealth"))
const SalonAndSpa = lazy(() => import("./beauty-and-health/SalonAndSpa"))
const SkinCare = lazy(() => import("./beauty-and-health/SkinCare"))
const NailsAndHairCare = lazy(() => import("./beauty-and-health/NailsAndHairCare"))
const FitnessAndGym = lazy(() => import("./beauty-and-health/FitnessAndGym"))
const NightLife = lazy(() => import("./category/NightLife"))
const Club = lazy(() => import("./nightlife/Club"))
const LuxuryNight = lazy(() => import("./nightlife/LuxuryNught"))
const FoodAndDrink = lazy(() => import("./nightlife/FoodAndDrink"))
const BarsAndLaunge = lazy(() => import("./nightlife/BarsAndLaunge"))
const HappeningThisMonth = lazy(() => import("./nightlife/HappeningThisMonth"))
const EventNights = lazy(() => import("./nightlife/EventNights"))
const EventTicketing = lazy(() => import("./category/EventTicketing"))
const ConcertAndShows = lazy(() => import("./event/ConcertsAndShows"))
const PrivateCinemal = lazy(() => import("./event/PrivateCinemal"))
const FestivalAndCorporatePromotion = lazy(() => import("./event/FestivaAndCorporatePromotion"))
const Business = lazy(() => import("./ForBusiness"))
const ClaimBusiness = lazy(() => import("./ClaimBusiness"))
const CookiePolicyPage = lazy(() => import("./other-pages/CookiePolicyPage"))
const TermsAndConditions = lazy(() => import("./other-pages/TermsAndConditions"))
const PrivacyPolicy = lazy(() => import("./other-pages/PrivacyPolicy"))
const CopyrightNotice = lazy(() => import("./assets/components/home-components/CopyrightNotice"))
const AccessibilityStatement = lazy(() => import("./other-pages/AccessibilityStatement"))
const BlogDetails = lazy(() => import("./blog/BlogDetails"))
const BlogList = lazy(() => import("./blog/BlogList"))
const HomeBlogList = lazy(() => import("./blog/HomeBlogList"))
const BlogPost = lazy(() => import("./blog/BlogPost"))
const NotFound = lazy(() => import("./other-pages/NotFound"))

// API test pages — only available on the local dev server, never in production builds
const ApiReview = lazy(() => import("./ApiReview"))
const CategoryApiCheck = lazy(() => import("./ForCheckReview/CategoryApiCheck"))
const BusinessListByCategoryWrapper = lazy(() => import("./category/BusinessListByCategoryWrapper"))
const BusinessDetails = lazy(() => import("./ForCheckReview/BusinessDetails"))
const CategoryApiCheckWithBusinesses = lazy(() => import("./ForCheckReview/CategoryApiCheckWithBusinesses"))
const FineDiningAPIViewer = lazy(() => import("./ForCheckReview/FineDiningAoi"))
const BusinessMessage = lazy(() => import("./ForCheckReview/BusinessMessage"))
const BlogApiCheck = lazy(() => import("./ForCheckReview/BlogApiCheck"))

const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <Commet color="#DB3A06" size="medium" text="Loading..." textColor="#193cb8" />
  </div>
)

function App() {
  return (
    <>
      <CookieConsent />
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/servicedetails/:businessId" element={<ServiceDetails />} />
          <Route path="/category/restaurants" element={<Restaurant />} />
          <Route path="/category/mobility" element={<Mobility />} />
          <Route path="/restaurant/finedining" element={<FineDining />} />
          <Route path="/restaurant/buffetservices" element={<BuffetServices />} />
          <Route path="/restaurant/iconicdelicacies" element={<LocalDelicacies />} />
          <Route path="/restaurant/mainstream" element={<MainStream />} />
          <Route path="/mobility/in-cityrides" element={<InCityRides />} />
          <Route path="/mobility/luxuryondemand" element={<LuxuryRides />} />
          <Route path="/mobility/householdlogistics" element={<HouseholdLogistics />} />
          <Route path="/category/outdoor-activities" element={<OutdoorActivities />} />
          <Route path="/outdooractivities/beaches&resorts" element={<BeachesResorts />} />
          <Route path="/outdooractivities/boat&yachtcruises" element={<BoatsYatch />} />
          <Route path="/outdooractivities/boatsyatch" element={<BoatsYatch />} />
          <Route path="/outdooractivities/parks&recreation" element={<ParksRecreation />} />
          <Route path="/category/accommodation" element={<Accommodation />} />
          <Route path="/accommodation/short-lethomes&beachhouses" element={<ShortLets />} />
          <Route path="/accommodation/beachresortaccommodation" element={<BeachesResortAccommodation />} />
          <Route path="/accommodation/hotelexperience" element={<HotelExperience />} />
          <Route path="/category/beauty-health" element={<BeautyHealth />} />
          <Route path="/category/nightlife" element={<NightLife />} />
          <Route path="/beautyhealth/salonsandspa" element={<SalonAndSpa />} />
          <Route path="/beautyhealth/spa&skincare" element={<SkinCare />} />
          <Route path="/beautyhealth/nail&haircare" element={<NailsAndHairCare />} />
          <Route path="/beautyhealth/fitness&gym" element={<FitnessAndGym />} />
          <Route path="/nightlife/clubbing&parties" element={<Club />} />
          <Route path="/nightlife/luxurynightlife" element={<LuxuryNight />} />
          <Route path="/nightlife/food&drinks" element={<FoodAndDrink />} />
          <Route path="/nightlife/bars&lounges" element={<BarsAndLaunge />} />
          <Route path="/nightlife/happeningthismonth" element={<HappeningThisMonth />} />
          <Route path="/nightlife/eventsnights" element={<EventNights />} />
          <Route path="/forbusiness" element={<Business />} />
          <Route path="/claim-business" element={<ClaimBusiness />} />
          <Route path="/category/event-ticketing" element={<EventTicketing />} />
          <Route path="/event-ticketing/concerts&shows" element={<ConcertAndShows />} />
          <Route path="/event-ticketing/privatecinemas" element={<PrivateCinemal />} />
          <Route path="/event-ticketing/festivals&corporatepromotions" element={<FestivalAndCorporatePromotion />} />
          {/* Event pages used to live under /restaurant — keep old links working */}
          <Route path="/restaurant/concerts&shows" element={<Navigate to="/event-ticketing/concerts&shows" replace />} />
          <Route path="/restaurant/privatecinemas" element={<Navigate to="/event-ticketing/privatecinemas" replace />} />
          <Route path="/restaurant/festivals&corporatepromotions" element={<Navigate to="/event-ticketing/festivals&corporatepromotions" replace />} />
          <Route path="/cookie-policy" element={<CookiePolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/copyright-notice" element={<CopyrightNotice />} />
          <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
          <Route path="/blog-details" element={<BlogDetails />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog-lists" element={<HomeBlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />

          {import.meta.env.DEV && (
            <>
              <Route path="/apireview" element={<ApiReview />} />
              <Route path="/categoryapireview" element={<CategoryApiCheck />} />
              <Route path="/category/businesslistbycategory/:categoryId" element={<BusinessListByCategoryWrapper />} />
              <Route path="/business/:businessId" element={<BusinessDetails />} />
              <Route path="/business/categorycheckwithbusinesses" element={<CategoryApiCheckWithBusinesses />} />
              <Route path="/business/finediningapi" element={<FineDiningAPIViewer />} />
              <Route path="/business-message" element={<BusinessMessage />} />
              <Route path="/blog-api-check" element={<BlogApiCheck />} />
            </>
          )}

          {/* 404 - Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
