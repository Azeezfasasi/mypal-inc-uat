import React from "react"
import { Route, Routes } from "react-router-dom"
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
import Testpage from "./testpage"
// import Testpage from "./Testpage"

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/servicedetails" element={<ServiceDetails />} />
        <Route path="/category/restaurant" element={<Restaurant />} />
        <Route path="/category/mobility" element={<Mobility />} />
        <Route path="/restaurant/finedining" element={<FineDining />} />
        <Route path="/restaurant/buffetservices" element={<BuffetServices />} />
        <Route path="/restaurant/localdelicacies" element={<LocalDelicacies />} />
        <Route path="/mobility/incityrides" element={<InCityRides />} />
        <Route path="/mobility/luxuryrides" element={<LuxuryRides/>} />
        <Route path="/mobility/householdlogistics" element={<HouseholdLogistics />} />
        <Route path="/category/outdooractivities" element={<OutdoorActivities />} />
        <Route path="/outdooractivities/beachesresorts" element={<BeachesResorts />} />
        <Route path="/outdooractivities/parksrecreation" element={<ParksRecreation />} />
        <Route path="/outdooractivities/boatsyatch" element={<BoatsYatch />} />
        <Route path="/category/accommodation" element={<Accommodation />} />
        <Route path="/category/BeautyHealth" element={<BeautyHealth />} />
        <Route path="/category/nightlife" element={<NightLife />} />
        <Route path="/forbusiness" element={<Business />} />
        <Route path="/testpage" element={<Testpage />} />
      </Routes>
    </>
  )
}

export default App
