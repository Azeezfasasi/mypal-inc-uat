import React from "react"
import { Route, Routes } from "react-router-dom"
import './App.css'
import 'rsuite/dist/rsuite-no-reset.min.css';
import Home from "./Home"
import ServiceDetails from "./services/ServiceDetails"
import Restaurant from "./category/Restaurant"
import FineDining from "./restaurant/FineDining"
import BuffetServices from "./restaurant/BuffetServices"
import LocalDelicacies from "./restaurant/LocalDelicacies"
import ScrollToTop from "./assets/components/ScrollToTop"
import Mobility from "./category/Mobility"
import InCityRides from "./mobility/InCityRides"
import LuxuryRides from "./mobility/LuxuryRides"
import HouseholdLogistics from "./mobility/HouseholdLogistics"
import OutdoorActivities from "./category/OutdoorActivities"
import ParksRecreation from "./outdooractivities/ParksRecreation"
import BoatsYatch from "./outdooractivities/BoatsYatch"
import BeachesResorts from "./outdooractivities/BeachesResorts"
import BusinessListBySlug from "./category/BusinessListBySlug"
import Accommodation from "./category/Accommodation"
import BeautyHealth from "./category/BeautyHealth"
import NightLife from "./category/NightLife"
import Business from "./ForBusiness"
import ApiReview from "./ApiReview"
import CategoryApiCheck from "./ForCheckReview/CategoryApiCheck"
import ShortLets from "./accommodation/Shortlets"
import SalonAndSpa from "./beauty-and-health/SalonAndSpa"
import Club from "./nightlife/Club"
import BusinessListByCategory from "./category/BusinessListByCategory"
import BusinessListByCategoryWrapper from "./category/BusinessListByCategoryWrapper"
import BusinessDetails from "./ForCheckReview/BusinessDetails"
import CategoryApiCheckWithBusinesses from "./ForCheckReview/CategoryApiCheckWithBusinesses"
import SearchResults from "./assets/components/home-components/SearchResults"
import MainStream from "./restaurant/MainStream";
import SkinCare from "./beauty-and-health/SkinCare";
import FitnessAndGym from "./beauty-and-health/FitnessAndGym";
import LuxuryNight from "./nightlife/LuxuryNught";
import FoodAndDrink from "./nightlife/FoodAndDrink";
import BarsAndLaunge from "./nightlife/BarsAndLaunge";
import HappeningThisMonth from "./nightlife/HappeningThisMonth";
import BeachesResortAccommodation from "./accommodation/BeachesResortAccommodation";
import HotelExperience from "./accommodation/HotelsExperience";
import FineDiningAPIViewer from "./ForCheckReview/FineDiningAoi";
import NailsAndHairCare from "./beauty-and-health/NailsAndHairCare";
import EventTicketing from "./category/EventTicketing";
import ConcertAndShows from "./event/ConcertsAndShows";
import PrivateCinemal from "./event/PrivateCinemal";
import FestivalAndCorporatePromotion from "./event/FestivaAndCorporatePromotion";
import CookieConsent from "./assets/components/home-components/CookieConsent";
import { Cookie } from "lucide-react";
import CookiePolicyPage from "./other-pages/CookiePolicyPage";
import TermsAndConditions from "./other-pages/TermsAndConditions";
import PrivacyPolicy from "./other-pages/PrivacyPolicy";
import CopyrightNotice from "./assets/components/home-components/CopyrightNotice";
import NotFound from "./other-pages/NotFound";
import BlogDetails from "./blog/BlogDetails";
import BlogApiCheck from "./ForCheckReview/BlogApiCheck";
import BlogList from "./blog/BlogList";
import BlogPost from "./blog/BlogPost";
import EventNights from "./nightlife/EventNights";
import AccessibilityStatement from "./other-pages/AccessibilityStatement";
import HomeBlogList from "./blog/HomeBlogList";
import BusinessMessage from "./ForCheckReview/BusinessMessage";

function App() {
  return (
    <>
      <CookieConsent />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/search-results" element={<SearchResults />} />
        <Route path="/services/servicedetails/:businessId" element={<ServiceDetails />} />
        <Route path="/category/restaurants" element={<Restaurant />} />
        <Route path="/category/mobility" element={<Mobility />} />
        <Route path="/restaurant/finedining" element={<FineDining />} />
        <Route path="/restaurant/buffetservices" element={<BuffetServices />} />
        <Route path="/restaurant/iconicdelicacies" element={<LocalDelicacies />} />
        <Route path="/restaurant/mainstream" element={<MainStream />} />
        <Route path="/mobility/in-cityrides" element={<InCityRides />} />
        <Route path="/mobility/luxuryondemand" element={<LuxuryRides/>} />
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
        <Route path="/category/event-ticketing" element={<EventTicketing />} />
  {/* <Route path="/category/:segmentSlug/:subcategorySlug" element={<BusinessListBySlug />} /> */}
        <Route path="/restaurant/concerts&shows" element={<ConcertAndShows />} />
        <Route path="/restaurant/privatecinemas" element={<PrivateCinemal />} />
        <Route path="/restaurant/festivals&corporatepromotions" element={<FestivalAndCorporatePromotion />} />
        <Route path="/cookie-policy" element={<CookiePolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/copyright-notice" element={<CopyrightNotice />} />
        <Route path="/accessibility-statement" element={<AccessibilityStatement />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blog-lists" element={<HomeBlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/blog-api-check" element={<BlogApiCheck />} />

        {/* 404 - Catch all */}
        <Route path="*" element={<NotFound />} />

        {/* For testing purposes */}
        <Route path="/apireview" element={<ApiReview />} />
        <Route path="/categoryapireview" element={<CategoryApiCheck />} />
        <Route path="/category/businesslistbycategory/:categoryId" element={<BusinessListByCategoryWrapper />} />
        <Route path="/business/:businessId" element={<BusinessDetails />} />
        <Route path="/business/categorycheckwithbusinesses" element={<CategoryApiCheckWithBusinesses />} />
        <Route path="/business/finediningapi" element={<FineDiningAPIViewer />} />
        <Route path="/business-message" element={<BusinessMessage />} />
      </Routes>
    </>
  )
}

export default App
