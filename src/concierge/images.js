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
