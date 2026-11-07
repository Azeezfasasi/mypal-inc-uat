import React, { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

const COPY = {
  'change-requests': {
    title: 'Request Changes',
    description: 'Tell us what you’d like to change. Your concierge will send you an updated proposal.',
    placeholder: 'e.g. Can we move the cruise to Sunday?',
    submit: 'Send Request',
  },
  questions: {
    title: 'Ask a Question',
    description: 'Ask your concierge anything about this proposal before you approve.',
    placeholder: 'e.g. Is airport pickup included on arrival day?',
    submit: 'Send Question',
  },
};

const MIN = 3;
const MAX = 2000;

/** Request Changes / Ask a Question — kind is "change-requests" or "questions" */
export default function MessageDialog({ kind, onClose, onSend, isSending }) {
  const [message, setMessage] = useState('');
  const copy = COPY[kind];

  useEffect(() => {
    if (!kind) return;
    setMessage('');
    const onKey = (e) => e.key === 'Escape' && !isSending && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  if (!copy) return null;
  const length = message.trim().length;

  return (
    <div className="concierge-font fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={copy.title}>
      <div className="absolute inset-0 bg-black/50" onClick={() => !isSending && onClose()} />
      <form
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
        onSubmit={(e) => {
          e.preventDefault();
          if (length >= MIN) onSend(message.trim());
        }}
      >
        <button type="button" onClick={onClose} disabled={isSending} aria-label="Close" className="absolute right-4 top-4 text-gray-400 hover:text-gray-700">
          <X size={18} />
        </button>
        <h3 className="text-xl font-bold text-gray-900">{copy.title}</h3>
        <p className="mt-1 text-sm text-gray-500">{copy.description}</p>
        <textarea
          autoFocus
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX))}
          placeholder={copy.placeholder}
          rows={5}
          className="mt-4 w-full resize-none rounded-lg border border-gray-200 p-3 text-sm focus:border-[#F4511E] focus:outline-none focus:ring-2 focus:ring-orange-100"
        />
        <p className="mt-1 text-right text-xs text-gray-400">
          {message.length}/{MAX}
        </p>
        <div className="mt-4 flex justify-end gap-3">
          <button type="button" onClick={onClose} disabled={isSending} className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSending || length < MIN}
            className="flex items-center gap-2 rounded-lg bg-[#F4511E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e04617] disabled:opacity-50"
          >
            {isSending && <Loader2 size={15} className="animate-spin" />}
            {copy.submit}
          </button>
        </div>
      </form>
    </div>
  );
}
