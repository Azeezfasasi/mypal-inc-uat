import React from 'react';
import { CalendarDays, Check, Clock, CreditCard, FileText, MessageSquare, Pencil, User } from 'lucide-react';
import { formatDateTime, formatNaira, isUnpriced } from '../format';
import { itemImage } from './helpers';
import { AvailabilityPill, Highlights } from './ui';

const STEP_STATE = {
  DONE: { badge: 'Done', badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-700', dot: 'bg-emerald-500 text-white' },
  IN_PROGRESS: { badge: 'In progress', badgeClass: 'border-orange-200 bg-orange-50 text-[#F4511E]', dot: 'bg-[#F4511E] text-white' },
  NEXT: { badge: 'Next', badgeClass: 'border-gray-200 bg-gray-50 text-gray-500', dot: 'bg-gray-200 text-gray-500' },
};

/** Shown once the proposal is approved (`approval` is set) */
export default function ThankYou({ proposal, onViewProposal, onRequestChanges, onAskQuestion }) {
  const approval = proposal.approval;

  return (
    <div className="pb-6">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1A2E] via-[#16243a] to-[#a8461f] px-6 pb-24 pt-10 text-white sm:px-12">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4511E]">
          <Check size={24} />
        </span>
        <h2 className="mt-5 text-4xl font-extrabold">Thank You!</h2>
        <p className="mt-2 text-xl font-semibold">Your selections have been submitted.</p>
        <p className="mt-3 max-w-xl text-sm text-white/75">
          We have received your approval for the selected services. Our team will now proceed with supplier
          confirmations and share the final itinerary with you.
        </p>
        {approval.payment_link_url && (
          <a
            href={approval.payment_link_url}
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-bold text-[#F4511E] shadow-lg hover:bg-orange-50"
          >
            <CreditCard size={18} /> Pay now
          </a>
        )}
      </section>

      <div className="relative z-10 mx-4 -mt-14 grid grid-cols-2 gap-4 rounded-2xl bg-white p-5 shadow-lg sm:mx-10 lg:grid-cols-4">
        <HeaderCard icon={FileText} label="Request Reference" value={proposal.reference} />
        <HeaderCard icon={FileText} label="Proposal Version" value={`Version ${proposal.version}`} />
        <HeaderCard icon={CalendarDays} label="Date Submitted" value={formatDateTime(approval.approved_at)} />
        <HeaderCard icon={User} label="Submitted By" value={approval.submitted_by} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_420px]">
        <section>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Your Selected Services</h3>
              <p className="text-sm text-gray-500">
                {approval.approved_count} of {approval.total_count} services approved
              </p>
            </div>
            <button type="button" onClick={onViewProposal} className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <FileText size={14} /> View Proposal
            </button>
          </div>
          <ul className="mt-4 space-y-3">
            {(approval.approved_items || []).map((item) => (
              <li key={item.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <img src={itemImage(item)} alt="" className="h-20 w-28 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  {item.supplier_name && <p className="text-sm text-gray-500">{item.supplier_name}</p>}
                  <div className="mt-1.5">
                    <Highlights items={item.highlights} />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-right text-lg font-bold text-gray-900">
                    {isUnpriced(item) ? 'To be quoted' : formatNaira(item.line_total)}
                  </p>
                  <AvailabilityPill availability={item.availability} />
                </div>
              </li>
            ))}
          </ul>
          {approval.not_confirmed_notice && (
            <p className="mt-4 flex gap-2 rounded-xl bg-slate-50 p-4 text-sm text-gray-600">
              <Clock size={16} className="mt-0.5 shrink-0" />
              {approval.not_confirmed_notice}
            </p>
          )}
        </section>

        <div className="space-y-5">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">What Happens Next?</h3>
            <ol className="mt-4 space-y-5">
              {(approval.next_steps || []).map((step) => {
                const state = STEP_STATE[step.state] || STEP_STATE.NEXT;
                return (
                  <li key={step.step} className="flex gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${state.dot}`}>
                      {step.state === 'DONE' ? <Check size={14} /> : step.step}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-gray-900">{step.title}</p>
                        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${state.badgeClass}`}>{state.badge}</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-5 flex gap-2 border-t border-gray-100 pt-4 text-xs text-gray-500">
              <Clock size={14} className="mt-0.5 shrink-0 text-[#F4511E]" />
              Timelines may vary depending on supplier availability. We will keep you updated at each step.
            </p>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900">Need to Make Changes?</h3>
            <p className="mt-1 text-sm text-gray-500">If you would like to add, remove or adjust any services, you can request changes or send us a message.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" onClick={onRequestChanges} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#F4511E] py-2.5 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
                <Pencil size={14} /> Request Changes
              </button>
              <button type="button" onClick={onAskQuestion} className="flex items-center justify-center gap-1.5 rounded-lg border border-[#F4511E] py-2.5 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
                <MessageSquare size={14} /> Ask a Question
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function HeaderCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#F4511E]">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-gray-400">{label}</p>
        <p className="truncate font-semibold text-gray-900">{value || '—'}</p>
      </div>
    </div>
  );
}
