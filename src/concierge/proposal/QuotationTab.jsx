import React from 'react';
import { formatNaira } from '../format';
import { TabFooter, TabHeading } from './ui';

const PENDING = 'Pending';

/** Any part of the total unknown → "Pending"; otherwise the API's number */
const amountOrPending = (value, pending) => (pending || value === null || value === undefined ? PENDING : formatNaira(value));

export default function QuotationTab({ proposal, canRespond, onRequestChanges, onApprove, onPrev, onNext }) {
  const q = proposal.quotation || {};
  const unquoted = Boolean(q.has_unquoted_items);
  const nothingQuoted = !q.services_subtotal;

  return (
    <>
      <TabHeading title="Your quotation" subtitle="A transparent breakdown of your proposed Lagos experience." />

      {q.is_illustrative && (
        <div className="mb-6 flex flex-wrap gap-x-6 gap-y-1 rounded-xl bg-orange-50 px-5 py-4 text-sm">
          <span className="font-semibold text-[#F4511E]">Illustrative quotation</span>
          <span className="text-gray-700">Actual supplier prices and fees will be filled in by your MyPal concierge.</span>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-gray-100 p-6">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Proposed services</h3>
            <span className="text-xs text-gray-400">Amount</span>
          </div>
          <ul className="divide-y divide-gray-100">
            {(q.services || []).map((s) => (
              <li key={s.label} className="flex justify-between py-3 text-sm">
                <span className="text-gray-700">{s.label}</span>
                <span className={s.status === 'TO_BE_QUOTED' || s.amount === null ? 'text-gray-500' : 'font-medium text-gray-900'}>
                  {s.status === 'TO_BE_QUOTED' ? 'To be quoted' : formatNaira(s.amount)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-between border-t border-gray-200 pt-4 text-sm font-semibold text-gray-900">
            <span>Services subtotal</span>
            <span>{amountOrPending(q.services_subtotal, nothingQuoted)}</span>
          </div>
        </section>

        <section className="rounded-2xl border border-gray-100 p-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Fees and total</h3>
          <ul className="divide-y divide-gray-100 text-sm">
            <li className="flex justify-between py-3">
              <span className="text-gray-700">Service subtotal</span>
              <span className="text-gray-900">{amountOrPending(q.services_subtotal, nothingQuoted)}</span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-700">MyPal concierge fee{q.concierge_fee_percent ? ` (${Number(q.concierge_fee_percent)}%)` : ''}</span>
              <span className="text-gray-900">{amountOrPending(q.concierge_fee, nothingQuoted)}</span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-700">Taxes / third-party fees</span>
              <span className="text-gray-900">{amountOrPending(q.taxes_and_fees, nothingQuoted)}</span>
            </li>
            <li className="flex justify-between py-3">
              <span className="text-gray-700">Optional add-ons</span>
              <span className="text-gray-500">Excluded unless added</span>
            </li>
          </ul>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-orange-50 px-4 py-3">
            <span className="font-semibold text-gray-900">Estimated total</span>
            <span className="text-right font-bold text-[#F4511E]">
              {nothingQuoted ? PENDING : formatNaira(q.estimated_total)}
              {unquoted && !nothingQuoted && <span className="block text-[11px] font-normal text-gray-500">at least — some items still to be quoted</span>}
            </span>
          </div>
        </section>
      </div>

      <div className="mt-6 rounded-xl bg-slate-50 px-5 py-4">
        <p className="text-sm font-semibold text-gray-900">Before you approve</p>
        <p className="mt-0.5 text-xs text-gray-500">Approval is not a confirmed booking. Supplier confirmation and payment terms follow.</p>
      </div>

      {canRespond && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onRequestChanges} className="rounded-lg border border-[#F4511E] px-8 py-3 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
            Request changes
          </button>
          <button type="button" onClick={onApprove} className="flex-1 rounded-lg bg-[#F4511E] py-3 text-sm font-semibold text-white hover:bg-[#e04617]">
            Approve selected services →
          </button>
        </div>
      )}

      <TabFooter prev={{ label: 'Previous: Optional Recommendations', onClick: onPrev }} next={{ label: 'Next: Important Notes', onClick: onNext }} />
    </>
  );
}
