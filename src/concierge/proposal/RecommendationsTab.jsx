import React, { useState } from 'react';
import { Check, CircleAlert, Info, Plus } from 'lucide-react';
import { formatNaira } from '../format';
import { itemImage } from './helpers';
import { Price, TabFooter, TabHeading } from './ui';

const ALL = 'ALL';

export default function RecommendationsTab({ proposal, options, selectedIds, onToggle, canRespond, onPrev, onNext }) {
  const { items = [], filters = [], note } = proposal.optional_recommendations || {};
  const [filter, setFilter] = useState(ALL);
  const filterLabel = (value) => options?.add_on_filters?.find((f) => f.value === value)?.label || value;
  const visible = filter === ALL ? items : items.filter((i) => i.filter_category === filter);
  const totals = proposal.review?.totals || {};
  const addOnsSelected = items.filter((i) => selectedIds.has(i.id)).length;
  const nights = proposal.trip?.nights;

  return (
    <>
      <TabHeading
        title="Optional Recommendations"
        subtitle="Enhance your Lagos experience with curated add-ons. These are optional and not included in your current total unless selected."
        action={
          <span className="flex items-center gap-1.5 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-medium text-[#F4511E]">
            <CircleAlert size={14} /> Not included in current total unless added.
          </span>
        }
      />

      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">No optional recommendations for this trip.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          <div>
            <div className="concierge-scrollbar-none mb-5 flex gap-2 overflow-x-auto">
              {[ALL, ...filters].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setFilter(value)}
                  className={`shrink-0 rounded-full px-4 py-1.5 text-sm transition ${
                    filter === value ? 'bg-[#F4511E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {value === ALL ? 'All' : filterLabel(value)}
                </button>
              ))}
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((item) => {
                const selected = selectedIds.has(item.id);
                return (
                  <article key={item.id} className={`flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm ${selected ? 'border-[#F4511E]' : 'border-gray-100'}`}>
                    <div className="relative">
                      <img src={itemImage(item)} alt="" className="h-40 w-full object-cover" />
                      <span className="absolute bottom-2 left-2 rounded-md bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-800">
                        {item.category_label}
                      </span>
                      {item.is_popular && (
                        <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-[#F4511E]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#F4511E]" /> Popular
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.supplier_name && <p className="text-xs text-gray-500">{item.supplier_name}</p>}
                      {item.description && <p className="mt-2 line-clamp-3 text-sm text-gray-600">{item.description}</p>}
                      <div className="mt-auto pt-4">
                        <Price item={{ ...item, line_total: item.unit_price ?? null }} nights={nights} />
                        {canRespond ? (
                          <button
                            type="button"
                            onClick={() => onToggle(item.id)}
                            className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border py-2 text-sm font-semibold transition ${
                              selected ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-[#F4511E] text-[#F4511E] hover:bg-orange-50'
                            }`}
                          >
                            {selected ? (
                              <>
                                <Check size={15} /> Added · Remove
                              </>
                            ) : (
                              <>
                                <Plus size={15} /> Add to Proposal
                              </>
                            )}
                          </button>
                        ) : (
                          selected && <p className="mt-3 text-sm font-medium text-emerald-700">Added to your proposal</p>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-6">
            <p className="font-semibold text-gray-900">Your Proposal Summary</p>
            <p className="mt-4 text-xs text-gray-500">Current estimated total</p>
            <p className="text-2xl font-bold text-gray-900">
              {totals.has_unquoted_items && !totals.estimated_total ? 'Pending' : formatNaira(totals.estimated_total, 'Pending')}
            </p>
            {totals.has_unquoted_items && totals.estimated_total ? <p className="text-xs text-gray-400">at least — some items are still to be quoted</p> : null}
            <p className="mt-4 text-xs text-gray-500">Optional add-ons selected</p>
            <p className="text-lg font-semibold text-gray-900">
              {addOnsSelected} item{addOnsSelected === 1 ? '' : 's'}
            </p>
            {note && (
              <p className="mt-5 flex gap-2 text-xs text-gray-500">
                <Info size={14} className="mt-0.5 shrink-0" />
                {note}
              </p>
            )}
          </aside>
        </div>
      )}

      <TabFooter prev={{ label: 'Previous: Experiences in Detail', onClick: onPrev }} next={{ label: 'Next: Quotation', onClick: onNext }} />
    </>
  );
}
