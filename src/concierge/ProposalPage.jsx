import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import {
  CalendarDays,
  Clock,
  Compass,
  CreditCard,
  FileDown,
  Heart,
  Loader2,
  MessageSquare,
  NotebookPen,
  Pencil,
  PlaneLanding,
  Share2,
  User,
  Wallet,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import mypallogo from '../assets/images/mypallogo.svg';
import {
  downloadProposalPdf,
  useApproveProposal,
  useConciergeOptions,
  useProposal,
  useSendProposalMessage,
  useUpdateSelection,
} from './conciergeApi';
import { formatDate, formatDateRange, whatsappLink } from './format';
import { conciergeImages } from './images';
import ExperiencesTab from './proposal/ExperiencesTab';
import ItineraryTab from './proposal/ItineraryTab';
import MessageDialog from './proposal/MessageDialog';
import NotesTab from './proposal/NotesTab';
import QuotationTab from './proposal/QuotationTab';
import RecommendationsTab from './proposal/RecommendationsTab';
import ReviewTab from './proposal/ReviewTab';
import ThankYou from './proposal/ThankYou';
import './concierge.css';

const TABS = [
  { id: 'itinerary', label: 'Proposed Itinerary' },
  { id: 'experiences', label: 'Experiences in Detail' },
  { id: 'recommendations', label: 'Optional Recommendations' },
  { id: 'quotation', label: 'Quotation' },
  { id: 'notes', label: 'Important Notes' },
  { id: 'review', label: 'Review & Approve' },
];

const SELECTION_DEBOUNCE_MS = 300;

/** Every ticked item: itinerary rows and add-ons */
const serverSelection = (proposal) =>
  new Set([
    ...(proposal?.review?.items || []).filter((i) => i.selected).map((i) => i.id),
    ...(proposal?.optional_recommendations?.items || []).filter((i) => i.selected).map((i) => i.id),
  ]);

export default function ProposalPage() {
  const { reference } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const { data: proposal, isLoading, error, refetch } = useProposal(reference, token);
  const { data: options } = useConciergeOptions();

  const [tab, setTab] = useState('itinerary');
  const [experienceId, setExperienceId] = useState(null);
  const [showProposal, setShowProposal] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [localSelection, setLocalSelection] = useState(null);
  const debounceRef = useRef(null);
  const changeCounter = useRef(0);
  const contentRef = useRef(null);

  const updateSelection = useUpdateSelection(reference, token);
  const approve = useApproveProposal(reference, token);
  const sendMessage = useSendProposalMessage(reference, token);

  useEffect(() => () => clearTimeout(debounceRef.current), []);

  const selectedIds = useMemo(() => localSelection ?? serverSelection(proposal), [localSelection, proposal]);

  // 404 = unknown or replaced link; 400 = a malformed token or reference
  if (!token || error?.status === 404 || error?.status === 400) return <InvalidLink contact={options?.concierge} />;

  if (isLoading) {
    return (
      <div className="concierge-font flex min-h-screen items-center justify-center text-gray-400">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (error || !proposal) {
    return (
      <div className="concierge-font flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center text-gray-600">
        <p>{error?.message || 'We couldn’t load your proposal.'}</p>
        <button type="button" onClick={() => refetch()} className="font-semibold text-[#F4511E] hover:underline">
          Try again
        </button>
      </div>
    );
  }

  const canRespond = Boolean(proposal.can_respond) && !proposal.approval;
  const contact = proposal.contact || options?.concierge;

  const goTo = (id) => {
    setTab(id);
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleConflict = (err) => {
    toast.error(err.message);
    if (err.status === 409) refetch();
  };

  // Optimistic: the ticks update at once; the full list is sent after a short pause
  const applySelection = (next) => {
    setLocalSelection(next);
    const change = ++changeCounter.current;
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateSelection.mutate([...next], {
        onSuccess: () => change === changeCounter.current && setLocalSelection(null),
        onError: (err) => {
          if (change === changeCounter.current) setLocalSelection(null);
          handleConflict(err);
        },
      });
    }, SELECTION_DEBOUNCE_MS);
  };

  const toggleItem = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    applySelection(next);
  };

  const handleApprove = (ids) => {
    approve.mutate(ids, {
      onSuccess: () => {
        setShowProposal(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: async (err) => {
        // Double click / second tab: if it was approved meanwhile, show the Thank-You screen
        if (err.status === 409) {
          const { data } = await refetch();
          if (data?.approval) return;
        }
        toast.error(err.message);
      },
    });
  };

  const handleSend = (message) => {
    sendMessage.mutate(
      { kind: dialog, message },
      {
        onSuccess: () => {
          toast.success('Sent to the concierge team');
          setDialog(null);
          if (dialog === 'change-requests') refetch();
        },
        onError: (err) => toast.error(err.message),
      }
    );
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'My Lagos Experience Proposal', url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success('Link copied. Anyone with this link can view this proposal.');
    } catch (err) {
      if (err?.name !== 'AbortError') toast.error('Couldn’t share the link');
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadProposalPdf(reference, token);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDownloading(false);
    }
  };

  const openItem = (id) => {
    setExperienceId(id);
    goTo('experiences');
  };

  const showThankYou = Boolean(proposal.approval) && !showProposal;
  const tabIndex = TABS.findIndex((t) => t.id === tab);
  const prev = () => goTo(TABS[Math.max(0, tabIndex - 1)].id);
  const next = () => goTo(TABS[Math.min(TABS.length - 1, tabIndex + 1)].id);

  return (
    <div className="concierge-font min-h-screen bg-white pb-24 lg:pb-10">
      <Helmet>
        <title>{`Your Lagos Experience Proposal · ${proposal.reference} | MyPal Concierge`}</title>
      </Helmet>
      <PrivateLinkMeta />
      <Toaster position="top-right" />

      {/* Top bar */}
      <header className="mx-auto flex w-[94%] max-w-7xl items-center justify-between gap-3 py-4">
        <Link to="/concierge" className="flex items-center gap-3">
          <img src={mypallogo} alt="" className="h-10 w-10 rounded-lg" />
          <span className="text-xl font-bold text-gray-900 sm:text-2xl">MyPal Concierge</span>
        </Link>
        <div className="flex items-center gap-2">
          <HeaderButton icon={Share2} label="Share" onClick={handleShare} title="Anyone with this link can view this proposal" />
          <HeaderButton icon={downloading ? Loader2 : FileDown} spin={downloading} label="Download PDF" onClick={handleDownload} disabled={downloading} />
          <button
            type="button"
            onClick={() => setDialog('change-requests')}
            className="hidden items-center gap-2 rounded-lg bg-[#0B1A2E] px-4 py-2 text-sm font-medium text-white hover:bg-[#13284a] sm:flex"
          >
            <MessageSquare size={15} /> Request Changes
          </button>
        </div>
      </header>

      <main className="mx-auto w-[94%] max-w-7xl">
        <StatusBanner proposal={proposal} />

        {showThankYou ? (
          <ThankYou
            proposal={proposal}
            onViewProposal={() => setShowProposal(true)}
            onRequestChanges={() => setDialog('change-requests')}
            onAskQuestion={() => setDialog('questions')}
          />
        ) : (
          <>
            {proposal.approval && (
              <button
                type="button"
                onClick={() => setShowProposal(false)}
                className="mb-4 flex w-full items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-800"
              >
                <span>You approved this proposal. View your approval and next steps.</span>
                {proposal.approval.payment_link_url ? (
                  <span className="flex items-center gap-1.5 font-semibold">
                    <CreditCard size={15} /> Pay now
                  </span>
                ) : (
                  <span className="font-semibold">View →</span>
                )}
              </button>
            )}

            <ProposalHero proposal={proposal} />

            {tab !== 'review' && (
              <div className="mt-24 grid gap-6 lg:mt-20 lg:grid-cols-2">
                <RequestSummary summary={proposal.request_summary} canRespond={canRespond} onEdit={() => setDialog('change-requests')} />
                <TeamNote proposal={proposal} />
              </div>
            )}

            <nav ref={contentRef} className={`concierge-scrollbar-none -mx-[3%] flex scroll-mt-4 gap-6 overflow-x-auto border-b border-gray-200 px-[3%] ${tab === 'review' ? 'mt-24 lg:mt-20' : 'mt-12'}`}>
              {TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => goTo(t.id)}
                  className={`shrink-0 border-b-2 pb-3 text-sm transition ${
                    tab === t.id ? 'border-[#F4511E] font-semibold text-[#F4511E]' : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>

            <div className="py-8">
              {tab === 'itinerary' && <ItineraryTab proposal={proposal} onOpenItem={openItem} onNext={next} />}
              {tab === 'experiences' && (
                <ExperiencesTab
                  proposal={proposal}
                  selectedId={experienceId}
                  onSelect={setExperienceId}
                  onPrev={prev}
                  onNext={next}
                />
              )}
              {tab === 'recommendations' && (
                <RecommendationsTab
                  proposal={proposal}
                  options={options}
                  selectedIds={selectedIds}
                  onToggle={toggleItem}
                  canRespond={canRespond}
                  onPrev={prev}
                  onNext={next}
                />
              )}
              {tab === 'quotation' && (
                <QuotationTab
                  proposal={proposal}
                  canRespond={canRespond}
                  onRequestChanges={() => setDialog('change-requests')}
                  onApprove={() => goTo('review')}
                  onPrev={prev}
                  onNext={next}
                />
              )}
              {tab === 'notes' && (
                <NotesTab proposal={proposal} canRespond={canRespond} onAskQuestion={() => setDialog('questions')} onPrev={prev} onNext={next} />
              )}
              {tab === 'review' && (
                <ReviewTab
                  proposal={proposal}
                  selectedIds={selectedIds}
                  onToggle={toggleItem}
                  onClearAll={() => applySelection(new Set())}
                  canRespond={canRespond}
                  isSaving={updateSelection.isPending || localSelection !== null}
                  onApprove={handleApprove}
                  isApproving={approve.isPending}
                  onRequestChanges={() => setDialog('change-requests')}
                  onAskQuestion={() => setDialog('questions')}
                  onViewItem={openItem}
                />
              )}
            </div>
          </>
        )}

        {contact?.whatsapp_number && (
          <p className="mt-6 text-center text-xs text-gray-500">
            Questions? Chat with your concierge on{' '}
            <a href={whatsappLink(contact.whatsapp_number, `Hello MyPal Concierge, about my proposal ${proposal.reference}`)} target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">
              WhatsApp
            </a>
            {contact.support_email && (
              <>
                {' '}or email{' '}
                <a href={`mailto:${contact.support_email}`} className="font-semibold text-gray-700 hover:underline">
                  {contact.support_email}
                </a>
              </>
            )}
            .
          </p>
        )}
      </main>

      {/* Mobile action bar */}
      {canRespond && !showThankYou && (
        <div className="fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-gray-100 bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] lg:hidden">
          <button type="button" onClick={() => setDialog('change-requests')} className="flex-1 rounded-lg border border-gray-200 py-3 text-sm font-semibold text-gray-800">
            Request Changes
          </button>
          <button type="button" onClick={() => goTo('review')} className="flex-1 rounded-lg bg-[#F4511E] py-3 text-sm font-semibold text-white">
            Approve Proposal →
          </button>
        </div>
      )}

      <MessageDialog kind={dialog} onClose={() => setDialog(null)} onSend={handleSend} isSending={sendMessage.isPending} />
    </div>
  );
}

/**
 * The page URL carries the access token: keep it out of Referer headers and search
 * engines. Rendered as plain tags — React 19 hoists them into <head> (react-helmet
 * only manages the title here).
 */
function PrivateLinkMeta() {
  return (
    <>
      <meta name="referrer" content="same-origin" />
      <meta name="robots" content="noindex, nofollow" />
    </>
  );
}

function HeaderButton({ icon: Icon, label, spin, ...props }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-60 sm:px-4"
      {...props}
    >
      <Icon size={15} className={spin ? 'animate-spin' : ''} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function StatusBanner({ proposal }) {
  if (proposal.can_respond || proposal.approval) {
    return proposal.request_status === 'CHANGES_REQUESTED' ? (
      <Banner tone="info">We’re updating your proposal based on your requested changes.</Banner>
    ) : null;
  }
  if (!proposal.is_latest_version) {
    return <Banner tone="warn">A newer version of this proposal exists — please use the latest link we sent you.</Banner>;
  }
  if (proposal.is_expired) {
    return <Banner tone="warn">This proposal has expired. Ask your concierge for an updated quotation.</Banner>;
  }
  if (proposal.request_status === 'CHANGES_REQUESTED') {
    return <Banner tone="info">We’re updating your proposal based on your requested changes.</Banner>;
  }
  return null;
}

function Banner({ tone, children }) {
  return (
    <p
      role="status"
      className={`mb-4 rounded-xl border px-4 py-3 text-sm ${
        tone === 'warn' ? 'border-amber-200 bg-amber-50 text-amber-800' : 'border-blue-200 bg-blue-50 text-blue-800'
      }`}
    >
      {children}
    </p>
  );
}

function ProposalHero({ proposal }) {
  const { hero = {}, trip = {} } = proposal;
  return (
    <section className="relative">
      <div className="relative overflow-hidden rounded-3xl bg-[#0B1A2E]">
        <img src={hero.image_url || conciergeImages.luxury} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1A2E] via-[#0B1A2E]/70 to-transparent" />
        <div className="relative px-6 pb-20 pt-10 text-white sm:px-10">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-white/80">
            <span className="rounded-full border border-white/40 bg-white/10 px-3 py-1 font-semibold uppercase tracking-wide">Trip proposal</span>
            <span>
              Ref: <span className="font-semibold text-white">{proposal.reference}</span>
            </span>
            <span className="text-white/40">|</span>
            <span>Version {proposal.version}</span>
            {proposal.issued_at && (
              <>
                <span className="text-white/40">|</span>
                <span>{formatDate(proposal.issued_at.slice(0, 10))}</span>
              </>
            )}
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            {(hero.title || 'Your Lagos Experience Proposal').replace(/Proposal$/, '')}
            {/Proposal$/.test(hero.title || 'Proposal') && <span className="text-[#F4511E]">Proposal</span>}
          </h1>
          {hero.subtitle && <p className="mt-3 max-w-md text-base text-white/80">{hero.subtitle}</p>}
        </div>
      </div>

      <div className="absolute inset-x-4 -bottom-16 grid grid-cols-2 gap-3 rounded-2xl bg-white p-4 shadow-lg sm:inset-x-8 lg:-bottom-10 lg:grid-cols-4 lg:divide-x lg:divide-gray-100">
        <TripFact icon={CalendarDays} title={formatDateRange(trip.arrival_date, trip.departure_date)} sub={trip.nights ? `${trip.nights} Night${trip.nights === 1 ? '' : 's'}` : ''} />
        <TripFact icon={User} title={`${trip.adults ?? 0} Adult${trip.adults === 1 ? '' : 's'}`} sub={`${trip.children ?? 0} Children`} />
        <TripFact icon={PlaneLanding} title="From" sub={trip.from} />
        <TripFact icon={Compass} title={trip.purpose_label} sub={(trip.interests || []).join(', ')} />
      </div>
    </section>
  );
}

function TripFact({ icon: Icon, title, sub }) {
  return (
    <div className="flex min-w-0 items-center gap-3 lg:px-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-[#F4511E]">
        <Icon size={18} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900">{title}</p>
        {sub && <p className="truncate text-xs text-gray-500">{sub}</p>}
      </div>
    </div>
  );
}

function RequestSummary({ summary, canRespond, onEdit }) {
  if (!summary) return null;
  const rows = [
    { icon: CalendarDays, label: 'Purpose of Trip', value: summary.purpose_of_trip },
    { icon: Heart, label: 'Interests', value: summary.interests?.join(', ') },
    { icon: MessageSquare, label: 'Special Requests', value: summary.special_requests },
    { icon: Wallet, label: 'Budget Range', value: summary.budget_range },
    { icon: NotebookPen, label: 'Additional Notes', value: summary.additional_notes },
  ].filter((r) => r.value);

  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <h2 className="text-lg font-semibold text-gray-900">Your Request Summary</h2>
        {canRespond && (
          <button type="button" onClick={onEdit} className="flex items-center gap-1.5 text-sm font-medium text-[#F4511E] hover:underline">
            <Pencil size={14} /> Edit Request
          </button>
        )}
      </div>
      <dl className="mt-4 space-y-3 text-sm">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="grid grid-cols-[150px_1fr] gap-3">
            <dt className="flex items-center gap-2 text-gray-500">
              <Icon size={15} /> {label}
            </dt>
            <dd className="text-gray-900">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function TeamNote({ proposal }) {
  const note = proposal.team_note;
  if (!note) return null;
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0B1A2E] text-white">
          <User size={18} />
        </span>
        <div>
          <p className="font-semibold text-gray-900">{note.author}</p>
          {note.date && <p className="text-xs text-gray-400">{formatDate(String(note.date).slice(0, 10))}</p>}
        </div>
      </div>
      {note.message && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-700">{note.message}</p>}
      {note.disclaimer && (
        <p className="mt-4 flex gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
          <Clock size={14} className="mt-0.5 shrink-0" />
          {note.disclaimer}
        </p>
      )}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Quotation valid until</p>
          <p className="text-sm font-semibold text-gray-900">{formatDate(proposal.quotation_valid_until) || '—'}</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-3">
          <p className="text-xs text-gray-500">Payment responsibility</p>
          <p className="text-sm font-semibold text-gray-900">{proposal.payment_responsibility || 'To be advised'}</p>
        </div>
      </div>
    </section>
  );
}

function InvalidLink({ contact }) {
  return (
    <div className="concierge-font flex min-h-screen flex-col items-center justify-center bg-[#FDF6EC] px-6 text-center">
      <PrivateLinkMeta />
      <img src={mypallogo} alt="MyPal" className="h-14 w-14 rounded-xl" />
      <h1 className="mt-6 text-2xl font-bold text-gray-900">This link is invalid or has been replaced</h1>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        Please use the latest proposal link we sent you, or contact your concierge and we’ll send a new one.
      </p>
      {contact?.whatsapp_number && (
        <a
          href={whatsappLink(contact.whatsapp_number, 'Hello MyPal Concierge, my proposal link isn’t working.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-600"
        >
          <FaWhatsapp /> Chat with your concierge
        </a>
      )}
      <Link to="/concierge" className="mt-4 text-sm font-medium text-[#F4511E] hover:underline">
        Go to MyPal Concierge
      </Link>
    </div>
  );
}
