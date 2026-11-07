import React from 'react';
import { ArrowRight, CircleCheck, MapPin } from 'lucide-react';
import { formatShortDate } from '../format';
import { itemImage, mapsUrl } from './helpers';
import { TabFooter, TabHeading } from './ui';

export default function ItineraryTab({ proposal, onOpenItem, onNext }) {
  const { itinerary = [], included_services = [], experiences = [] } = proposal;
  const firstLocation = experiences.find((e) => e.location)?.location;
  const mapLink = mapsUrl(firstLocation);

  return (
    <>
      <TabHeading
        title="Proposed Itinerary"
        subtitle="A day-by-day plan based on your preferences. You can request changes to any day."
        action={
          mapLink && (
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-[#F4511E] hover:bg-orange-100"
            >
              <MapPin size={15} /> View on Map
            </a>
          )
        }
      />

      {itinerary.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">
          Your concierge is still putting the itinerary together.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {itinerary.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenItem(item.id)}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white text-left shadow-sm transition hover:shadow-md"
            >
              <div className="relative">
                <img src={itemImage(item)} alt="" className="h-40 w-full object-cover lg:h-32" />
                <span className="absolute left-2 top-2 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-gray-800 lg:hidden">
                  Day {item.day_number} • {formatShortDate(item.service_date)}
                </span>
              </div>
              <div className="p-4">
                <p className="hidden text-xs text-gray-400 lg:block">
                  Day {item.day_number} • {formatShortDate(item.service_date)}
                </p>
                <p className="mt-1 font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{[item.supplier_name, item.subtitle].filter(Boolean).join(', ')}</p>
                <span className="mt-3 ml-auto flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-[#F4511E] transition group-hover:bg-[#F4511E] group-hover:text-white">
                  <ArrowRight size={14} />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {included_services.length > 0 && (
        <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
          <p className="mb-4 font-semibold text-gray-900">Included Services</p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {included_services.map((service) => (
              <li key={service} className="flex items-start gap-2 text-sm text-gray-700">
                <CircleCheck size={18} className="mt-0.5 shrink-0 fill-emerald-500 text-white" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      )}

      <TabFooter next={{ label: 'Next: Experiences in Detail', onClick: onNext }} />
    </>
  );
}
