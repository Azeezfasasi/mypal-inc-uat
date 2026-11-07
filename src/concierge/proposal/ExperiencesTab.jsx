import React, { useEffect, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, CircleCheck, Info, ListChecks, MapPin } from 'lucide-react';
import { formatDate, formatShortDate } from '../format';
import { itemImage, mapsUrl } from './helpers';
import { TabFooter, TabHeading } from './ui';

const VISIBLE_THUMBS = 5;

/** OpenStreetMap embed around a point — no API key needed */
const osmEmbedUrl = ({ latitude, longitude }) => {
  const lat = Number(latitude);
  const lng = Number(longitude);
  const d = 0.01;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d}%2C${lat - d}%2C${lng + d}%2C${lat + d}&layer=mapnik&marker=${lat}%2C${lng}`;
};

export default function ExperiencesTab({ proposal, selectedId, onSelect, onPrev, onNext }) {
  const experiences = proposal.experiences || [];
  const index = Math.max(0, experiences.findIndex((e) => e.id === selectedId));
  const item = experiences[index];
  const [photo, setPhoto] = useState(0);

  useEffect(() => setPhoto(0), [item?.id]);

  if (!item) {
    return (
      <>
        <TabHeading title="Experiences in Detail" />
        <p className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">No experiences yet.</p>
        <TabFooter prev={{ label: 'Previous: Proposed Itinerary', onClick: onPrev }} next={{ label: 'Next: Optional Recommendations', onClick: onNext }} />
      </>
    );
  }

  const images = item.images?.length ? item.images : [itemImage(item)];
  const mapLink = mapsUrl(item.location);
  const hasCoords = item.location?.latitude && item.location?.longitude;
  const nextItem = experiences[index + 1];

  return (
    <>
      <TabHeading
        title="Experiences in Detail"
        subtitle="Here’s more information about each experience in your proposal."
        action={
          mapLink && (
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-full border border-[#F4511E] px-4 py-2 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
              <MapPin size={15} /> View on Map
            </a>
          )
        }
      />

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        {/* Day list */}
        <ol className="concierge-scrollbar-none flex gap-3 overflow-x-auto lg:flex-col lg:overflow-visible">
          {experiences.map((exp, i) => {
            const active = exp.id === item.id;
            return (
              <li key={exp.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onSelect(exp.id)}
                  className={`flex w-60 items-center gap-3 rounded-xl border px-4 py-3 text-left transition lg:w-full ${
                    active ? 'border-orange-200 bg-orange-50/60' : 'border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F4511E] text-xs font-bold text-white">{i + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase text-[#F4511E]">
                      Day {exp.day_number} <span className="ml-1 font-normal text-gray-400">{formatShortDate(exp.service_date)}</span>
                    </span>
                    <span className="block truncate text-sm font-semibold text-gray-900">{exp.title}</span>
                    {exp.supplier_name && <span className="block truncate text-xs text-gray-500">{exp.supplier_name}</span>}
                  </span>
                  <ChevronRight size={16} className="text-gray-400" />
                </button>
              </li>
            );
          })}
        </ol>

        <div className="min-w-0">
          {/* Gallery */}
          <div className="overflow-hidden rounded-2xl border border-gray-100">
            <div className="relative">
              <img src={images[photo]} alt={item.title} className="h-[260px] w-full object-cover sm:h-[340px]" />
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                <CalendarDays size={13} /> Day {item.day_number} • {formatShortDate(item.service_date)}
              </span>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Previous photo"
                    onClick={() => setPhoto((p) => (p - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next photo"
                    onClick={() => setPhoto((p) => (p + 1) % images.length)}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-2.5">
                {images.slice(0, VISIBLE_THUMBS).map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setPhoto(i)}
                    className={`h-14 w-20 overflow-hidden rounded-md border-2 ${i === photo ? 'border-[#F4511E]' : 'border-transparent'}`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
                {images.length > VISIBLE_THUMBS && (
                  <button
                    type="button"
                    onClick={() => setPhoto(VISIBLE_THUMBS)}
                    className="flex h-14 w-20 items-center justify-center rounded-md bg-gray-800 text-xs font-semibold text-white"
                  >
                    +{images.length - VISIBLE_THUMBS} more
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
            <div>
              {item.description && <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">{item.description}</p>}
              {item.amenities?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.amenities.map((a) => (
                    <div key={a.label} className="min-w-[90px] rounded-lg border border-gray-100 px-3 py-2 text-center">
                      <p className="text-xs font-semibold text-gray-800">{a.label}</p>
                      {a.note && <p className="text-[11px] text-gray-400">{a.note}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {item.location && (
              <div className="rounded-xl border border-gray-100 p-3">
                <p className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <MapPin size={15} className="text-[#F4511E]" /> Location
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{[item.location.address, item.location.city].filter(Boolean).join(', ')}</p>
                {hasCoords && (
                  <iframe
                    title={`Map of ${item.title}`}
                    src={osmEmbedUrl(item.location)}
                    loading="lazy"
                    className="mt-2 h-32 w-full rounded-lg border-0"
                  />
                )}
                {mapLink && (
                  <a href={mapLink} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-center justify-between text-xs font-semibold text-[#F4511E]">
                    View on Map <ChevronRight size={14} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {item.service_date && (
              <InfoCard icon={CalendarDays} title="Date">
                <p>{formatDate(item.service_date)}</p>
              </InfoCard>
            )}
            {item.inclusions?.length > 0 && (
              <InfoCard icon={ListChecks} title="Inclusions">
                {item.inclusions.map((inc) => (
                  <p key={inc} className="flex items-start gap-1.5">
                    <CircleCheck size={14} className="mt-0.5 shrink-0 fill-emerald-500 text-white" />
                    {inc}
                  </p>
                ))}
              </InfoCard>
            )}
            {item.important_info?.length > 0 && (
              <InfoCard icon={Info} title="Important Information">
                {item.important_info.map((info) => (
                  <p key={info}>{info}</p>
                ))}
              </InfoCard>
            )}
          </div>
        </div>
      </div>

      <TabFooter
        prev={{ label: 'Previous: Proposed Itinerary', onClick: onPrev }}
        next={
          nextItem
            ? { label: `Next: Day ${nextItem.day_number} – ${nextItem.title}`, onClick: () => onSelect(nextItem.id) }
            : { label: 'Next: Optional Recommendations', onClick: onNext }
        }
      />
    </>
  );
}

function InfoCard({ icon: Icon, title, children }) {
  return (
    <div className="rounded-xl border border-gray-100 p-4">
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <Icon size={15} className="text-gray-500" /> {title}
      </p>
      <div className="space-y-1.5 text-xs text-gray-600">{children}</div>
    </div>
  );
}
