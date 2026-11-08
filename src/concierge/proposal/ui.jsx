import React from 'react';
import { formatNaira, isUnpriced, priceCaption } from '../format';

export function TabHeading({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/** "₦720,000 for 2 adults", or "To be quoted" */
export function Price({ item, nights, size = 'lg' }) {
  const unpriced = isUnpriced(item);
  const caption = unpriced ? '' : priceCaption(item, nights);
  return (
    <p className="flex items-baseline gap-1.5">
      <span className={`${size === 'lg' ? 'text-xl' : 'text-base'} font-bold ${unpriced ? 'text-gray-500' : 'text-gray-900'}`}>
        {formatNaira(unpriced ? null : item.line_total ?? item.unit_price)}
      </span>
      {caption && <span className="text-xs text-gray-400">{caption}</span>}
    </p>
  );
}

export function QuotedPill({ item }) {
  return isUnpriced(item) ? (
    <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-500">To be quoted</span>
  ) : (
    <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">Quoted</span>
  );
}

const AVAILABILITY = {
  PENDING: { label: 'Selected for Booking', className: 'border-emerald-200 bg-emerald-50 text-emerald-700' },
  CONFIRMED: { label: 'Confirmed', className: 'border-emerald-300 bg-emerald-100 text-emerald-800' },
  UNAVAILABLE: { label: 'Unavailable — we’ll suggest alternatives', className: 'border-red-200 bg-red-50 text-red-700' },
};

export function AvailabilityPill({ availability }) {
  const { label, className } = AVAILABILITY[availability] || AVAILABILITY.PENDING;
  return <span className={`rounded-full border px-3 py-1 text-xs font-medium ${className}`}>{label}</span>;
}

export function Highlights({ items }) {
  if (!items?.length) return null;
  return (
    <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
      {items.map((h) => (
        <span key={h} className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          {h}
        </span>
      ))}
    </p>
  );
}

export function TabFooter({ prev, next }) {
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-6">
      {prev ? (
        <button type="button" onClick={prev.onClick} className="rounded-lg border border-[#F4511E] px-5 py-2.5 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
          ← {prev.label}
        </button>
      ) : (
        <span />
      )}
      {next && (
        <button type="button" onClick={next.onClick} className="rounded-lg bg-[#F4511E] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-[#e04617]">
          {next.label} →
        </button>
      )}
    </div>
  );
}

