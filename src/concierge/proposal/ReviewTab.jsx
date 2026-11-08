import React, { useState } from 'react';
import { ArrowRight, CircleAlert, Clock, Loader2, Lock, MessageSquare, Pencil } from 'lucide-react';
import { formatNaira, isUnpriced } from '../format';
import { itemImage } from './helpers';
import { Highlights, Price, QuotedPill, TabHeading } from './ui';

export default function ReviewTab({
  proposal,
  selectedIds,
  onToggle,
  onClearAll,
  canRespond,
  isSaving,
  onApprove,
  isApproving,
  onRequestChanges,
  onAskQuestion,
  onViewItem,
}) {
  const review = proposal.review || {};
  const items = review.items || [];
  const totals = review.totals || {};
  const [declared, setDeclared] = useState(false);
  const selected = items.filter((i) => selectedIds.has(i.id));
  const nights = proposal.trip?.nights;
  const canApprove = canRespond && declared && selected.length > 0 && !isSaving && !isApproving;

  return (
    <>
      <TabHeading
        title="Review & Approve Selected Services"
        subtitle="Select the services you would like us to arrange. Review the quoted prices, fees and terms before approving."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {items.map((item) => {
            const checked = selectedIds.has(item.id);
            return (
              <article key={item.id} className={`flex gap-4 rounded-2xl border bg-white p-4 shadow-sm ${checked ? 'border-orange-200' : 'border-gray-100'}`}>
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={!canRespond}
                  onChange={() => onToggle(item.id)}
                  aria-label={`Select ${item.title}`}
                  className="mt-1 h-5 w-5 shrink-0 accent-[#F4511E]"
                />
                <img src={itemImage(item)} alt="" className="hidden h-24 w-36 shrink-0 rounded-xl object-cover sm:block" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                      {item.supplier_name && <p className="text-sm text-gray-500">{item.supplier_name}</p>}
                    </div>
                    <QuotedPill item={item} />
                  </div>
                  <div className="mt-2">
                    <Highlights items={item.highlights} />
                  </div>
                  {item.description && <p className="mt-2 line-clamp-2 text-sm text-gray-600">{item.description}</p>}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-3">
                    <Price item={item} nights={nights} />
                    {item.kind === 'ITINERARY' && (
                      <button type="button" onClick={() => onViewItem(item.id)} className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50">
                        View Details ›
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="space-y-5 lg:sticky lg:top-6 lg:h-fit">
          <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Your Selected Services ({selected.length})</h3>
              {canRespond && selected.length > 0 && (
                <button type="button" onClick={onClearAll} className="text-sm font-medium text-[#F4511E] hover:underline">
                  Clear All
                </button>
              )}
            </div>
            <ul className="mt-4 divide-y divide-gray-100">
              {selected.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-3">
                  <img src={itemImage(item)} alt="" className="h-10 w-10 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">{item.title}</p>
                    <p className="truncate text-xs text-gray-500">{item.supplier_name}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{isUnpriced(item) ? 'To be quoted' : formatNaira(item.line_total)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-2 space-y-2 border-t border-gray-100 pt-4 text-sm">
              <p className="font-semibold text-gray-900">Estimated Total {isSaving && <Loader2 size={13} className="ml-1 inline animate-spin text-gray-400" />}</p>
              <Row label={`Selected Services (${totals.selected_count ?? selected.length})`} value={formatNaira(totals.services_subtotal, 'Pending')} />
              <Row label={`MyPal Concierge Service Charge${proposal.quotation?.concierge_fee_percent ? ` (${Number(proposal.quotation.concierge_fee_percent)}%)` : ''}`} value={formatNaira(totals.concierge_fee, 'Pending')} />
              <Row label="Taxes & Third-Party Fees (est.)" value={formatNaira(totals.taxes_and_fees, 'Pending')} />
            </div>
            <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-4">
              <span className="font-semibold text-gray-900">Estimated Total</span>
              <span className="text-right text-2xl font-bold text-[#F4511E]">
                {totals.has_unquoted_items && !totals.estimated_total ? 'Pending' : formatNaira(totals.estimated_total, 'Pending')}
                {totals.has_unquoted_items && totals.estimated_total ? <span className="block text-[11px] font-normal text-gray-500">at least</span> : null}
              </span>
            </div>
            <p className="mt-4 flex gap-2 rounded-lg border border-orange-100 bg-orange-50/60 p-3 text-xs text-gray-600">
              <Clock size={14} className="mt-0.5 shrink-0 text-[#F4511E]" />
              This is a proposal, not a confirmed booking. All services are subject to availability and final confirmation with our partners.
            </p>
          </section>

          {canRespond && (
            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">Approval Declaration</h3>
              <label className="mt-3 flex cursor-pointer gap-2.5 text-xs text-gray-600">
                <input type="checkbox" checked={declared} onChange={(e) => setDeclared(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#F4511E]" />
                {review.declaration ||
                  'I have reviewed the selected services, their quoted prices, applicable fees and terms. I understand that my approval authorizes MyPal to proceed with coordination, but bookings remain subject to supplier confirmation.'}
              </label>
              <button
                type="button"
                disabled={!canApprove}
                onClick={() => onApprove(selected.map((i) => i.id))}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4511E] py-3.5 text-base font-semibold text-white shadow-md shadow-orange-200 hover:bg-[#e04617] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isApproving ? <Loader2 size={18} className="animate-spin" /> : null}
                Approve Selected Services {!isApproving && <ArrowRight size={18} />}
              </button>
              {selected.length === 0 && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                  <CircleAlert size={13} /> Select at least one service to approve.
                </p>
              )}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button type="button" onClick={onRequestChanges} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#F4511E] py-2.5 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
                  <Pencil size={14} /> Request Changes
                </button>
                <button type="button" onClick={onAskQuestion} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#F4511E] py-2.5 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
                  <MessageSquare size={14} /> Ask a Question
                </button>
              </div>
              <p className="mt-4 flex gap-2 text-xs text-gray-500">
                <Lock size={13} className="mt-0.5 shrink-0" /> Your information is secure and will only be used for this request.
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

function Row({ label, value }) {
  return (
    <p className="flex justify-between gap-3 text-gray-600">
      <span>{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </p>
  );
}
