import React from "react"
import { Route, Routes } from "react-router-dom"
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

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/business/search-results" element={<SearchResults />} />
        <Route path="/services/servicedetails/:businessId" element={<ServiceDetails />} />
        <Route path="/category/restaurant" element={<Restaurant />} />
        <Route path="/category/mobility" element={<Mobility />} />
        <Route path="/restaurant/finedining" element={<FineDining />} />
        <Route path="/restaurant/buffetservices" element={<BuffetServices />} />
        <Route path="/restaurant/iconicdelicacies" element={<LocalDelicacies />} />
        <Route path="/restaurant/mainstream" element={<MainStream />} />
        <Route path="/mobility/incityrides" element={<InCityRides />} />
        <Route path="/mobility/luxuryrides" element={<LuxuryRides/>} />
        <Route path="/mobility/householdlogistics" element={<HouseholdLogistics />} />
        <Route path="/category/outdooractivities" element={<OutdoorActivities />} />
        <Route path="/outdooractivities/beaches&resorts" element={<BeachesResorts />} />
        <Route path="/outdooractivities/boat&yachtcruises" element={<BoatsYatch />} />
        <Route path="/outdooractivities/boatsyatch" element={<BoatsYatch />} />
        <Route path="/outdooractivities/parks&recreation" element={<ParksRecreation />} />
        <Route path="/category/accommodation" element={<Accommodation />} />
        <Route path="accommodation/shortsletshomes" element={<ShortLets />} />
        <Route path="/category/BeautyHealth" element={<BeautyHealth />} />
        <Route path="/category/nightlife" element={<NightLife />} />
        <Route path="/beautyhealth/salonsandspa" element={<SalonAndSpa />} />
        <Route path="/nightlife/club" element={<Club />} />
        <Route path="/forbusiness" element={<Business />} />

        {/* For testing purposes */}
        <Route path="/apireview" element={<ApiReview />} />
        <Route path="/categoryapireview" element={<CategoryApiCheck />} />
        <Route path="/category/businesslistbycategory/:categoryId" element={<BusinessListByCategoryWrapper />} />
        <Route path="/business/:businessId" element={<BusinessDetails />} />
        <Route path="/business/categorycheckwithbusinesses" element={<CategoryApiCheckWithBusinesses />} />
      </Routes>
    </>
  )
}

export default App
