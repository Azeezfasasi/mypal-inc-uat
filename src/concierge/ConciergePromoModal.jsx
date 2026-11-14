import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BedDouble, CarFront, Droplet, Info, Martini, Sailboat, Star, UtensilsCrossed, X } from 'lucide-react';
// Figma exports: the panel background and three labelled thumbnails
import skyline from '../assets/images/concierge/promo-skyline.png';
import staysThumb from '../assets/images/concierge/promo-stays.png';
import diningThumb from '../assets/images/concierge/promo-dining.png';
import cruisesThumb from '../assets/images/concierge/promo-cruises.png';
import './concierge-promo.css';

// Shown once per visitor; a dismissal hides it for 7 days (confirm the window with product).
const STORAGE_KEY = 'mypal.conciergePromo.dismissedAt';
const SUPPRESS_MS = 7 * 24 * 60 * 60 * 1000;
const SHOW_DELAY_MS = 1500;

const TILES = [
  { label: ['Stays &', 'Accommodation'], icon: BedDouble },
  { label: ['Curated', 'Dining'], icon: UtensilsCrossed },
  { label: ['Airport & Local', 'Transfers'], icon: CarFront },
  { label: ['Nightlife', '& Experiences'], icon: Martini },
  { label: ['Wellness', '& Beauty'], icon: Droplet },
  { label: ['Beaches', '& Cruises'], icon: Sailboat },
];

const THUMBS = [
  { label: 'Stays', image: staysThumb },
  { label: 'Dining', image: diningThumb },
  { label: 'Cruises', image: cruisesThumb },
];

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function recentlyDismissed() {
  try {
    const at = Number(window.localStorage.getItem(STORAGE_KEY));
    return Number.isFinite(at) && at > 0 && Date.now() - at < SUPPRESS_MS;
  } catch {
    // Storage blocked (private mode, disabled cookies): show it, just don't remember
    return false;
  }
}

/** The cookie banner (CookieConsent) stores the visitor's choice under "cookieConsent" */
function cookieChoiceMade() {
  try {
    return Boolean(window.localStorage.getItem('cookieConsent'));
  } catch {
    // Storage blocked: the banner can't remember a choice either, so don't wait for it
    return true;
  }
}

function rememberDismissal() {
  try {
    window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    // Ignore: the modal still closes
  }
}

/** FE-29: "Plan Your Lagos Experience with Concierge" promo, shown on the homepage */
export default function ConciergePromoModal() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);

  // Wait for the cookie banner first, so a first-time visitor sees one prompt at a time
  useEffect(() => {
    if (recentlyDismissed()) return undefined;
    let timer;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    };
    if (cookieChoiceMade()) schedule();
    else window.addEventListener('mypal:cookie-consent', schedule, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('mypal:cookie-consent', schedule);
    };
  }, []);

  const close = useCallback(() => {
    rememberDismissal();
    setOpen(false);
  }, []);

  // While open: lock page scroll, move focus into the dialog, trap Tab, close on Esc
  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    dialogRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const items = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      returnFocusRef.current?.focus?.();
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="concierge-promo-backdrop fixed inset-0 z-[1000] flex items-center justify-center bg-[#0B1A2E]/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="concierge-promo-title"
        aria-describedby="concierge-promo-text"
        tabIndex={-1}
        className="concierge-promo relative grid max-h-[calc(100dvh-2rem)] w-full max-w-[1064px] overflow-y-auto rounded-[28px] bg-white shadow-2xl outline-none md:grid-cols-[1.17fr_1fr] md:overflow-hidden"
      >
        {/* Left: offer */}
        <div className="flex flex-col px-5 pb-6 pt-6 sm:px-10 sm:pb-8 sm:pt-10">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#F8C9B4] bg-[#FFF3EE] px-3.5 py-1.5 text-xs font-semibold text-[#E4470F] sm:text-sm">
            <Star size={14} className="fill-[#E4470F]" aria-hidden="true" /> New on MyPal
          </span>
          <h2 id="concierge-promo-title" className="mt-5 text-[26px] font-extrabold leading-[1.15] tracking-tight text-[#0B1A2E] sm:text-[34px]">
            Plan Your Lagos Experience with <span className="text-[#E4470F]">Concierge</span>
          </h2>
          <p id="concierge-promo-text" className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-[15px]">
            Get personalized trip planning, curated dining, stays, transfers, nightlife, wellness, beaches &amp; cruises, and tailored recommendations — all
            in one place.
          </p>

          <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {TILES.map(({ label, icon: Icon }) => (
              <li
                key={label.join(' ')}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-[#FBE3D8] bg-[#FFF8F4] px-1 py-3 text-center text-[11px] font-medium leading-tight text-gray-800 sm:py-4 sm:text-[13px]"
              >
                <Icon size={18} strokeWidth={1.8} className="text-[#E4470F]" aria-hidden="true" />
                <span>
                  {label[0]}
                  <br />
                  {label[1]}
                </span>
              </li>
            ))}
          </ul>

          <Link
            to="/concierge"
            // Close right away: the route change renders in a transition, so waiting for unmount leaves the scroll lock on
            onClick={close}
            className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-[#E4470F] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(228,71,15,0.7)] transition-colors hover:bg-[#cc3d0b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4470F]"
          >
            Explore Concierge <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={close}
            className="mt-3 rounded-xl border border-[#E4470F] bg-white px-6 py-3.5 text-[15px] font-semibold text-[#E4470F] transition-colors hover:bg-[#FFF3EE] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E4470F]"
          >
            Continue to Homepage
          </button>
          <p className="mt-6 flex items-start gap-2 text-xs text-gray-500 sm:text-[13px]">
            <Info size={16} className="mt-px shrink-0 fill-gray-400 text-white" aria-hidden="true" />
            You can also find Concierge anytime from the navigation.
          </p>
        </div>

        {/* Right: imagery (hidden on small screens) */}
        <div className="relative hidden flex-col overflow-hidden bg-[#050B14] md:flex">
          <img src={skyline} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="relative mt-12 text-center text-white" aria-hidden="true">
            <p className="concierge-promo-script text-[64px] leading-none">Lagos</p>
            <p className="mt-1 text-[13px] font-medium tracking-[0.3em]">CURATED FOR YOU</p>
          </div>
          {/* The thumbnails carry their own label, corners and frame */}
          <ul className="relative mt-auto grid grid-cols-3 gap-3 p-6">
            {THUMBS.map(({ label, image }) => (
              <li key={label}>
                <img src={image} alt={label} width={133} height={161} className="h-auto w-full" />
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-[#E4470F] md:bg-white/15 md:text-white md:hover:bg-white/25"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
