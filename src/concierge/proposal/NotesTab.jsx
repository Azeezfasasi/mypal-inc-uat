import React from 'react';
import { TabFooter, TabHeading } from './ui';

export default function NotesTab({ proposal, canRespond, onAskQuestion, onPrev, onNext }) {
  const notes = proposal.important_notes || [];

  return (
    <>
      <TabHeading title="Important notes" subtitle="Everything to know before you approve your Lagos experience." />

      <div className="rounded-xl border border-orange-200 bg-orange-50 px-5 py-4">
        <p className="font-semibold text-gray-900">Important: Your trip is not yet booked</p>
        <p className="mt-1 text-sm text-gray-700">
          {proposal.team_note?.disclaimer ||
            'This proposal is an offer for your review. Services remain subject to supplier confirmation. Your approval alone does not reserve a room, activity, transfer or experience.'}
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {notes.map((note, i) => (
          <article key={note.title} className="rounded-2xl border border-gray-100 p-6">
            <h3 className="flex items-center gap-3 text-lg font-semibold text-gray-900">
              <span className="rounded-md bg-orange-50 px-2 py-0.5 text-sm font-bold text-[#F4511E]">{String(i + 1).padStart(2, '0')}</span>
              {note.title}
            </h3>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-600">{note.body}</p>
          </article>
        ))}
      </div>

      {canRespond && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-50 px-5 py-4">
          <div>
            <p className="font-semibold text-gray-900">Questions about your proposal?</p>
            <p className="text-sm text-gray-500">Ask your assigned concierge for clarification before approving any service.</p>
          </div>
          <button type="button" onClick={onAskQuestion} className="rounded-lg border border-[#F4511E] px-5 py-2.5 text-sm font-semibold text-[#F4511E] hover:bg-orange-50">
            Ask a question →
          </button>
        </div>
      )}

      <TabFooter prev={{ label: 'Previous: Quotation', onClick: onPrev }} next={{ label: 'Review selected services', onClick: onNext }} />
    </>
  );
}
