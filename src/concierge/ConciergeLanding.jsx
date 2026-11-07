import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  ArrowRight,
  BedDouble,
  Car,
  CircleCheck,
  ClipboardList,
  Flower2,
  Mail,
  Martini,
  Palmtree,
  ShieldCheck,
  Star,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import MainHeader from '../assets/components/home-components/MainHeader';
import FooterSection from '../assets/components/home-components/FooterSection';
import TripRequestWizard from './TripRequestWizard';
import { useConciergeOptions } from './conciergeApi';
import { formatPhone, whatsappLink } from './format';
import { conciergeImages as img } from './images';
import './concierge.css';

// Shown until GET /concierge/options loads (same values the API returns)
const FALLBACK_CONTACT = { whatsapp_number: '+2349055557535', support_email: 'info@mypal-inc.com' };

const MARQUEE = ['Good food', 'Group trips', 'Nightlife', 'Beach vibez', 'Rooftop sunsets', 'Lagos energy', 'Detty December'];

const SERVICES = [
  { title: 'Airport Transfers', text: 'Smooth, reliable airport pickups and drop-offs across Lagos.', cta: 'Book a Transfer', icon: Car, image: img.luxuryRide, preset: { experiences: ['AIRPORT_TRANSFERS'] } },
  { title: 'Stays', text: 'Handpicked hotels, apartments and short stays for every style.', cta: 'Find a Stay', icon: BedDouble, image: img.hotel, preset: { experiences: ['STAYS'] } },
  { title: 'Dining Experiences', text: 'From local gems to fine dining, we’ll get you the best tables.', cta: 'Explore Dining', icon: UtensilsCrossed, image: img.finedining, preset: { experiences: ['DINING'] } },
  { title: 'Nightlife', text: 'VIP access to Lagos’ hottest spots and exclusive events.', cta: 'Plan a Night Out', icon: Martini, image: img.club, preset: { experiences: ['NIGHTLIFE'] } },
  { title: 'Beaches & Cruises', text: 'Relax at top beach resorts or enjoy unforgettable boat cruises.', cta: 'Explore Beaches', icon: Palmtree, image: img.beach, preset: { experiences: ['BEACHES_CRUISES'] } },
  { title: 'Wellness', text: 'Spa days, wellness experiences and self-care, the Lagos way.', cta: 'Book Wellness', icon: Flower2, image: img.wellness, preset: { experiences: ['WELLNESS'] } },
];

const CURATED = [
  { title: 'Lagos Weekend', days: '2–3 Days', text: 'A perfect mix of sightseeing, dining and nightlife.', image: img.shortlet, preset: { purpose: 'LEISURE', experiences: ['STAYS', 'DINING', 'NIGHTLIFE'] } },
  { title: 'Family Lagos', days: '3–5 Days', text: 'Fun, safe and memorable experiences for the whole family.', image: img.beach, preset: { purpose: 'LEISURE', travel_style: 'FAMILY', experiences: ['STAYS', 'BEACHES_CRUISES', 'DINING'], other_preferences: ['FAMILY_FRIENDLY'] } },
  { title: 'Detty December', days: '5–7 Days', text: 'The ultimate Lagos party and cultural experience.', image: img.club, preset: { purpose: 'LEISURE', experiences: ['NIGHTLIFE', 'DINING', 'STAYS'], other_preferences: ['VIBRANT_NIGHTLIFE'] } },
  { title: 'Executive Lagos', days: '2–4 Days', text: 'Business, networking and premium leisure.', image: img.luxuryRide, preset: { purpose: 'BUSINESS', experience_style: 'PREMIUM', experiences: ['STAYS', 'CHAUFFEUR', 'DINING'], other_preferences: ['BUSINESS_FRIENDLY'] } },
  { title: 'Luxury Escape', days: '4–7 Days', text: 'Exclusive stays, private cruises and premium experiences.', image: img.luxury, preset: { purpose: 'LEISURE', experience_style: 'LUXURY', experiences: ['STAYS', 'BEACHES_CRUISES', 'WELLNESS'] } },
];

const STEPS = [
  { title: 'Tell us your plans', text: 'Share your travel dates, interests and preferences.', icon: ClipboardList },
  { title: 'Receive a curated proposal', text: 'Get a tailored itinerary with the best options and trusted partners.', icon: Mail },
  { title: 'Confirm and enjoy', text: 'Book with confidence and let our concierge team take care of the rest.', icon: CircleCheck },
];

const WHY = [
  { title: 'Vetted Partners', text: 'We work with trusted, high-quality hotels, transport providers and experience partners.', icon: ShieldCheck },
  { title: 'Personalized Support', text: 'A dedicated concierge team that understands Lagos and your unique needs.', icon: Users },
  { title: 'Transparent Coordination', text: 'Clear options, honest pricing and seamless booking from start to finish.', icon: ClipboardList },
];

const Eyebrow = ({ children, light }) => (
  <p className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? 'text-[#F59E42]' : 'text-[#E4572E]'}`}>{children}</p>
);

const PrimaryButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-2 rounded-lg bg-[#E4470F] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:bg-[#cc3d0b]"
  >
    {children} <ArrowRight size={16} />
  </button>
);

const GhostButton = ({ children, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
  >
    {children}
  </button>
);

export default function ConciergeLanding() {
  const { data: options } = useConciergeOptions();
  const contact = { ...FALLBACK_CONTACT, ...options?.concierge };
  const [wizard, setWizard] = useState({ open: false, initial: undefined });
  const openWizard = (initial) => setWizard({ open: true, initial });
  const scrollToServices = () => document.getElementById('concierge-services')?.scrollIntoView({ behavior: 'smooth' });
  const chatUrl = whatsappLink(contact.whatsapp_number, 'Hello MyPal Concierge, I’d like help planning my Lagos trip.');

  return (
    <div className="concierge-font bg-white">
      <Helmet>
        <title>MyPal Concierge | Your Lagos, Your Way</title>
        <meta
          name="description"
          content="Planning, booking and enjoying Lagos through trusted concierge support. Tell us your plans and get a curated Lagos proposal from the MyPal Concierge team."
        />
        <link rel="canonical" href="https://www.mypal-inc.com/concierge" />
      </Helmet>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0B1A2E] text-white">
        <img src={img.luxury} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A2E] via-[#0B1A2E]/85 to-[#0B1A2E]/40" />
        <div className="relative">
          <MainHeader />
          <div className="mx-auto grid w-[90%] max-w-6xl items-center gap-12 pb-24 pt-10 lg:grid-cols-2">
            <div>
              <Eyebrow light>MyPal Concierge</Eyebrow>
              <h1 className="mt-4 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
                Your Lagos,
                <br />
                <span className="text-[#E4470F]">Your Way.</span>
              </h1>
              <p className="mt-5 max-w-sm text-base text-white/75">
                Planning, booking and enjoying Lagos through trusted concierge support.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => openWizard()}>Plan My Lagos Trip</PrimaryButton>
                <GhostButton onClick={scrollToServices}>Book a Service</GhostButton>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                {[
                  { icon: Users, value: '1,200+', label: 'Happy guests' },
                  { icon: Star, value: '4.8/5', label: 'Average rating' },
                  { icon: ShieldCheck, value: '150+', label: 'Trusted partners' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                    <Icon size={18} className="text-[#F59E42]" />
                    <div>
                      <p className="text-lg font-bold leading-none">{value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-white/60">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo collage */}
            <div className="relative mx-auto hidden h-[360px] w-full max-w-[480px] lg:block">
              <PhotoCard src={img.fooddrink} tag="Table for six" className="right-0 top-0 h-[190px] w-[250px] rotate-3" tagClass="-right-3 top-3 rotate-12" />
              <PhotoCard src={img.beach} tag="Sunday cruise" className="left-0 top-[70px] h-[180px] w-[240px] -rotate-3" tagClass="-left-3 -top-3 -rotate-12" />
              <PhotoCard src={img.wellness} tag="Luxury stays" className="bottom-0 right-10 h-[200px] w-[170px] rotate-2" tagClass="-bottom-3 -right-4 -rotate-12" />
            </div>
          </div>

          <a
            href={chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-[5%] hidden items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 text-sm text-gray-800 shadow-xl sm:flex"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <FaWhatsapp />
            </span>
            Need help? <span className="font-medium text-emerald-600">Chat with our concierge →</span>
          </a>
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden border-t border-white/10 py-4">
          <div className="concierge-marquee flex w-max gap-10 whitespace-nowrap">
            {[...MARQUEE, ...MARQUEE].map((word, i) => (
              <span key={i} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                {word} <span className="text-[#E4470F]">*</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="concierge-services" className="bg-[#FDF6EC] py-20">
        <div className="mx-auto w-[90%] max-w-6xl">
          <SectionHeading
            eyebrow="Our services"
            title="Everything You Need for an Amazing Lagos Experience"
            text="From airport transfers to exclusive experiences, MyPal Concierge simplifies your Lagos journey with trusted partners and personalised support."
            link="View all services"
            onLink={() => openWizard()}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ title, text, cta, icon: Icon, image, preset }) => (
              <article key={title} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <img src={image} alt="" className="h-40 w-full object-cover" />
                <div className="relative px-5 pb-5 pt-8">
                  <span className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#E4470F] shadow-md">
                    <Icon size={20} />
                  </span>
                  <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500">{text}</p>
                  <button type="button" onClick={() => openWizard(preset)} className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#E4470F] hover:underline">
                    {cta} <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Curated experiences */}
      <section className="py-20">
        <div className="mx-auto w-[90%] max-w-6xl">
          <SectionHeading
            eyebrow="Curated experiences"
            title="Lagos Experiences, Thoughtfully Curated"
            text="Ready-made itineraries for every kind of traveller, carefully designed by our local experts."
            link="View all experiences"
            onLink={() => openWizard()}
          />
          <div className="concierge-scrollbar-none mt-10 flex snap-x gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
            {CURATED.map(({ title, days, text, image, preset }) => (
              <article key={title} className="w-[220px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm lg:w-auto">
                <div className="relative">
                  <img src={image} alt="" className="h-32 w-full object-cover" />
                  <span className="absolute left-2 top-2 rounded-full bg-[#0B1A2E]/80 px-2.5 py-1 text-[10px] font-semibold text-white">{days}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">{title}</h3>
                  <p className="mt-1 min-h-[3.75rem] text-xs text-gray-500">{text}</p>
                  <button type="button" onClick={() => openWizard(preset)} className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#E4470F] hover:underline">
                    View Experience <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* How it works */}
          <div className="mt-24">
            <Eyebrow>How it works</Eyebrow>
            <h2 className="mt-3 max-w-md text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              Three Simple Steps to Your Perfect Lagos Experience
            </h2>
            <ol className="mt-10 grid gap-6 lg:grid-cols-3">
              {STEPS.map(({ title, text, icon: Icon }, i) => (
                <li key={title} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E4470F] font-bold text-white shadow-lg shadow-orange-200">
                    {i + 1}
                  </span>
                  <div className="flex-1 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <p className="flex items-center gap-2 font-semibold text-gray-900">
                      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-50 text-[#E4470F]">
                        <Icon size={15} />
                      </span>
                      {title}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Question to compass */}
      <section className="bg-[#FDF6EC] py-20">
        <div className="mx-auto grid w-[90%] max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>From question to compass</Eyebrow>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              From “where should we go?” to <span className="concierge-serif font-normal text-[#E4470F]">“that was lovely.”</span>
            </h2>
            <p className="mt-5 max-w-md text-gray-600">
              Every plan by our concierge, from the first spark of an idea to the final night out — all in one lovely
              place. You dream it, we map it, book it and smooth every edge.
            </p>
            <button
              type="button"
              onClick={() => openWizard()}
              className="mt-7 flex items-center gap-2 rounded-lg bg-[#0B1A2E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#13284a]"
            >
              Discover How It Works <ArrowRight size={16} />
            </button>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-500">
              Discover. Reserve. Celebrate. Experience.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-[280px] rotate-6 rounded-[2.5rem] border-[10px] border-[#111827] bg-[#0B1A2E] p-3 shadow-2xl">
              <div className="rounded-[1.75rem] bg-[#0B1A2E] p-4 text-white">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F59E42]">MyPal Concierge</p>
                <p className="mt-2 text-2xl font-extrabold leading-tight">
                  Your Lagos,
                  <br />
                  <span className="text-[#E4470F]">Your Way.</span>
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {[img.luxuryRide, img.hotel, img.finedining, img.beach].map((src) => (
                    <img key={src} src={src} alt="" className="h-20 w-full rounded-lg object-cover" />
                  ))}
                </div>
                <span className="mt-3 block rounded-full bg-[#E4470F] py-2 text-center text-xs font-semibold">Plan My Trip →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dinner CTA */}
      <section className="py-20">
        <div className="mx-auto w-[90%] max-w-6xl">
          <button
            type="button"
            onClick={() => openWizard({ experiences: ['DINING'] })}
            className="group relative block h-[380px] w-full overflow-hidden rounded-3xl text-left shadow-xl"
          >
            <img src={img.bars} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2E] via-[#0B1A2E]/50 to-transparent" />
            <span className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-800">Table for six · tonight, 8 PM</span>
            <div className="absolute bottom-8 left-8 right-24 text-white">
              <Eyebrow light>At your service</Eyebrow>
              <p className="mt-3 max-w-xl text-3xl font-bold leading-tight">Your next great Lagos dinner starts before you leave home</p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">Curated tables · Booked in minutes</p>
            </div>
            <span className="absolute bottom-8 right-8 flex h-11 w-11 items-center justify-center rounded-full bg-[#E4470F] text-white">
              <ArrowRight size={18} />
            </span>
          </button>
        </div>
      </section>

      {/* Why MyPal */}
      <section className="bg-[#FDF6EC] py-20">
        <div className="mx-auto grid w-[90%] max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Why MyPal</Eyebrow>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">A More Trusted Way to Experience Lagos</h2>
            <p className="mt-4 max-w-md text-gray-600">
              Local expertise, trusted partners and a dedicated concierge team, so you can focus on enjoying every moment.
            </p>
            <div className="mt-8 space-y-4">
              {WHY.map(({ title, text, icon: Icon }) => (
                <div key={title} className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-50 text-[#E4470F]">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
              <div className="flex items-center gap-1.5 bg-[#0B1A2E] px-4 py-3">
                {['bg-red-400', 'bg-amber-400', 'bg-emerald-400'].map((c) => (
                  <span key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />
                ))}
                <span className="ml-4 flex-1 rounded-md bg-white/10 px-3 py-1 text-[10px] text-white/50">mypal.app</span>
              </div>
              <div className="flex">
                <div className="w-32 space-y-2 bg-[#0B1A2E] p-3 text-[11px] text-white/70">
                  <p className="mb-3 text-sm font-bold text-white">
                    My<span className="text-[#E4470F]">Pal</span>
                  </p>
                  <p className="rounded-md bg-[#E4470F] px-2 py-1.5 text-white">Concierge</p>
                  {['Experiences', 'Reservations', 'Messages', 'Settings'].map((l) => (
                    <p key={l} className="px-2 py-1">{l}</p>
                  ))}
                </div>
                <div className="flex-1 p-4">
                  <div className="rounded-xl bg-[#FDF6EC] p-3">
                    <p className="text-sm font-bold text-gray-900">Good morning!</p>
                    <p className="text-[10px] text-gray-500">Let’s plan your next Lagos experience.</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {[
                        [img.hotel, 'Stays'],
                        [img.finedining, 'Dining'],
                        [img.beach, 'Experiences'],
                      ].map(([src, label]) => (
                        <div key={label} className="overflow-hidden rounded-lg bg-white">
                          <img src={src} alt="" className="h-12 w-full object-cover" />
                          <p className="px-1.5 py-1 text-[9px] font-semibold text-gray-800">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-xs font-semibold text-gray-900">Popular in Lagos</p>
                  {[
                    [img.hotel, 'Luxury Stays', 'Skyline suites & resorts'],
                    [img.finedining, 'Dining Experiences', 'Chef’s tables & gems'],
                    [img.beach, 'Beach & Cruises', 'Weekend on the water'],
                  ].map(([src, title, sub]) => (
                    <div key={title} className="mt-2 flex items-center gap-2 rounded-lg border border-gray-100 p-1.5">
                      <img src={src} alt="" className="h-8 w-8 rounded object-cover" />
                      <div>
                        <p className="text-[10px] font-semibold text-gray-900">{title}</p>
                        <p className="text-[9px] text-gray-500">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden bg-[#0B1A2E] text-white">
        <img src={img.luxury} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative mx-auto w-[90%] max-w-6xl py-24">
          <p className="text-center text-4xl font-extrabold leading-tight sm:text-5xl">
            The city rewards those who
            <br />
            wander<span className="concierge-serif font-normal text-[#E4470F]">slowly.</span>
          </p>
          <p className="mt-5 text-center text-[11px] uppercase tracking-[0.3em] text-white/50">Good plans. Better experiences. — Lagos, Nigeria</p>

          <div className="mt-24 grid items-center gap-10 lg:grid-cols-2">
            <div>
              <Eyebrow light>MyPal Concierge</Eyebrow>
              <h2 className="mt-3 text-4xl font-extrabold">
                Let&apos;s Plan Your <span className="text-[#E4470F]">Lagos Story.</span>
              </h2>
              <p className="mt-3 max-w-md text-white/70">From arrival to unforgettable experiences, we’re here to make it seamless.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <PrimaryButton onClick={() => openWizard()}>Plan My Lagos Trip</PrimaryButton>
                <GhostButton onClick={scrollToServices}>Book a Service</GhostButton>
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
              <p className="font-semibold">Get in Touch</p>
              <a href={chatUrl} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-3 rounded-xl bg-white/10 p-3 hover:bg-white/15">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
                  <FaWhatsapp size={18} />
                </span>
                <span>
                  <span className="block text-xs text-white/60">Chat on WhatsApp</span>
                  <span className="font-semibold">{formatPhone(contact.whatsapp_number)}</span>
                </span>
              </a>
              <a href={`mailto:${contact.support_email}`} className="mt-3 flex items-center gap-3 rounded-xl bg-white/10 p-3 hover:bg-white/15">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-[#F59E42]">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-xs text-white/60">Send us an Email</span>
                  <span className="font-semibold underline">{contact.support_email}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />

      <TripRequestWizard
        open={wizard.open}
        initial={wizard.initial}
        onClose={() => setWizard((w) => ({ ...w, open: false }))}
      />
    </div>
  );
}

function SectionHeading({ eyebrow, title, text, link, onLink }) {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3 max-w-lg text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">{title}</h2>
      </div>
      <div className="max-w-xs lg:text-right">
        <p className="text-sm text-gray-500">{text}</p>
        <button type="button" onClick={onLink} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#E4470F] hover:underline">
          {link} <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

function PhotoCard({ src, tag, className, tagClass }) {
  return (
    <div className={`absolute rounded-2xl bg-white p-1.5 shadow-2xl ${className}`}>
      <img src={src} alt="" className="h-full w-full rounded-xl object-cover" />
      <span className={`absolute rounded-full bg-[#E4470F] px-3 py-1 text-[10px] font-semibold text-white shadow ${tagClass}`}>* {tag}</span>
    </div>
  );
}
