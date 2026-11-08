// Photos for the concierge pages, reused from the site's existing images until
// the Figma exports are added.
import hotel from '../assets/images/hotel.jpeg';
import finedining from '../assets/images/finediningnew.jpg';
import club from '../assets/images/club.jpeg';
import beach from '../assets/images/beachsandr.jpeg';
import wellness from '../assets/images/beautyandhealth.jpeg';
import luxuryRide from '../assets/images/luxuryridenew.jpg';
import incity from '../assets/images/incitynew.jpg';
import household from '../assets/images/householdnew.jpg';
import luxury from '../assets/images/luxury.jpeg';
import shortlet from '../assets/images/shortletheroimg.jpeg';
import fooddrink from '../assets/images/fooddrink.jpeg';
import event from '../assets/images/event1.jpeg';
import bars from '../assets/images/bars.jpeg';

// Figma exports (src/assets/images/concierge)
import airporttransfers from '../assets/images/concierge/airporttransfers.svg';
import beachedandcruises from '../assets/images/concierge/beachedandcruises.svg';
import conciergedashboard from '../assets/images/concierge/conciergedashboard.svg';
import conciergehall from '../assets/images/concierge/conciergehall.jpg';
import dettydecember from '../assets/images/concierge/dettydecember.svg';
import diningexperience from '../assets/images/concierge/diningexperience.svg';
import executivelagos from '../assets/images/concierge/executivelagos.svg';
import familylagos from '../assets/images/concierge/familylagos.svg';
import hero3bg from '../assets/images/concierge/hero3bg.svg';
import heroimg from '../assets/images/concierge/heroimg.png';
import lagosweekend from '../assets/images/concierge/lagosweekend.svg';
import luxuryescape from '../assets/images/concierge/luxuryescape.svg';
import nightlife from '../assets/images/concierge/nightlife.svg';
import smartphone from '../assets/images/concierge/smartphone.svg';
import stays from '../assets/images/concierge/stays.svg';
import conciergewellness from '../assets/images/concierge/conciergewellness.svg';
import whymypal from '../assets/images/concierge/whymypal.svg';
import ladyonboat from '../assets/images/concierge/ladyonboat.jpg';
import ladyonbed from '../assets/images/concierge/ladyonbed.jpg';
import mencelebration from '../assets/images/concierge/mencelebration.jpg';


export const conciergeImages = {
  hotel,
  finedining,
  club,
  beach,
  wellness,
  luxuryRide,
  incity,
  household,
  luxury,
  shortlet,
  fooddrink,
  event,
  bars,

  // Figma images
  airporttransfers,
  beachedandcruises,
  conciergedashboard,
  conciergehall,
  dettydecember,
  diningexperience,
  executivelagos,
  familylagos,
  hero3bg,
  heroimg,
  lagosweekend,
  luxuryescape,
  nightlife,
  smartphone,
  stays,
  conciergewellness,
  whymypal,
  ladyonboat,
  ladyonbed,
  mencelebration,
};

/** Photo per experience / item category */
export const CATEGORY_IMAGES = {
  STAYS: hotel,
  DINING: finedining,
  NIGHTLIFE: club,
  BEACHES_CRUISES: beach,
  WELLNESS: wellness,
  AIRPORT_TRANSFERS: luxuryRide,
  CHAUFFEUR: incity,
  HOME_SERVICES: household,
  OTHER: luxury,
};
