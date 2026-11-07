import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Copy, Loader2, Mail, Minus, Plus, Sparkles, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import mypallogo from '../assets/images/mypallogo.svg';
import { useConciergeOptions, useCreateTripRequest } from './conciergeApi';
import { formatPhone, nightsBetween, todayInLagos, whatsappLink } from './format';
import { CATEGORY_IMAGES, conciergeImages } from './images';

const STEPS = ['Trip Details', 'Travellers', 'Experiences', 'Preferences', 'Your Details'];

const STEP_ASIDE = [
  { image: conciergeImages.luxury, caption: 'A city of energy, culture and unforgettable experiences.' },
  { image: conciergeImages.shortlet, caption: 'Let us tailor the experience to your group, style and needs.' },
  { image: conciergeImages.wellness, caption: 'From luxury stays to island cruises, curate your dream Lagos experience.' },
  { image: conciergeImages.finedining, caption: "From luxury to laid-back, we'll curate options that fit your style and budget." },
  { image: conciergeImages.beach, caption: 'Sit back, relax. Our concierge team will take care of the rest.' },
];

const COUNTRY_CODES = [
  { code: '+234', label: 'NG' },
  { code: '+44', label: 'GB' },
  { code: '+1', label: 'US/CA' },
  { code: '+233', label: 'GH' },
  { code: '+27', label: 'ZA' },
  { code: '+254', label: 'KE' },
  { code: '+971', label: 'AE' },
  { code: '+33', label: 'FR' },
  { code: '+49', label: 'DE' },
];

const MAX_NIGHTS = 60;

const EMPTY_FORM = {
  purpose: '',
  visiting_from: '',
  arrival_date: '',
  departure_date: '',
  dates_flexible: false,
  adults: 2,
  children: 0,
  travel_style: '',
  special_requirements: [],
  special_requirements_other: '',
  experiences: [],
  experience_notes: '',
  experience_style: '',
  budget_text: '',
  budget_covers: 'ENTIRE_TRIP',
  other_preferences: [],
  full_name: '',
  email: '',
  country_code: '+234',
  local_number: '',
  preferred_contact_method: 'WHATSAPP',
  additional_notes: '',
  accepted_terms: false,
};

/** "500,000", "500k", "500,000 – 1,000,000" → { min, max }; null when unreadable */
const parseBudget = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return {};
  const toNumber = (part) => {
    const match = part.trim().toLowerCase().replace(/[₦,\s]|ngn/g, '').match(/^(\d+(?:\.\d+)?)([km])?$/);
    if (!match) return NaN;
    const multiplier = match[2] === 'k' ? 1_000 : match[2] === 'm' ? 1_000_000 : 1;
    return Math.round(Number(match[1]) * multiplier);
  };
  const parts = trimmed.split(/\s*(?:-|–|—|to)\s*/i).filter(Boolean);
  if (parts.length > 2) return null;
  const [min, max] = parts.map(toNumber);
  if (Number.isNaN(min) || (parts.length === 2 && Number.isNaN(max))) return null;
  return parts.length === 2 ? { min, max } : { min };
};

const toggle = (list, value) => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

function validateStep(step, form) {
  if (step === 0) {
    if (!form.purpose) return 'Tell us what brings you to Lagos.';
    if (!form.visiting_from.trim()) return 'Tell us where you are visiting from.';
    if (!form.arrival_date || !form.departure_date) return 'Choose your arrival and departure dates.';
    if (form.arrival_date < todayInLagos()) return 'Arrival date can’t be in the past.';
    if (form.departure_date < form.arrival_date) return 'Departure must be on or after arrival.';
    if (nightsBetween(form.arrival_date, form.departure_date) > MAX_NIGHTS) return `Trips can be up to ${MAX_NIGHTS} nights.`;
  }
  if (step === 1) {
    if (form.adults < 1) return 'At least one adult is required.';
    if (!form.travel_style) return 'Choose a travel style.';
    if (form.special_requirements.includes('OTHER') && !form.special_requirements_other.trim()) {
      return 'Please specify your other requirement.';
    }
  }
  if (step === 2 && form.experiences.length === 0) return 'Choose at least one experience.';
  if (step === 3) {
    if (!form.experience_style) return 'Choose your preferred experience style.';
    const budget = parseBudget(form.budget_text);
    if (budget === null) return 'Enter a budget like 500,000 or 500,000 – 1,000,000.';
    if (budget.max !== undefined && budget.max < budget.min) return 'The maximum budget must be at least the minimum.';
  }
  if (step === 4) {
    if (!form.full_name.trim()) return 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Enter a valid email address.';
    if (form.local_number.replace(/\D/g, '').length < 6) return 'Enter your WhatsApp number.';
    if (!form.accepted_terms) return 'Please accept the Terms & Conditions and Privacy Policy.';
  }
  return null;
}

function buildPayload(form) {
  const budget = parseBudget(form.budget_text) || {};
  const local = form.local_number.replace(/\D/g, '').replace(/^0+/, '');
  const optional = (value) => (value && String(value).trim() ? String(value).trim() : undefined);
  return {
    purpose: form.purpose,
    visiting_from: form.visiting_from.trim(),
    arrival_date: form.arrival_date,
    departure_date: form.departure_date,
    dates_flexible: form.dates_flexible,
    adults: form.adults,
    children: form.children,
    travel_style: form.travel_style,
    special_requirements: form.special_requirements.length ? form.special_requirements : undefined,
    special_requirements_other: form.special_requirements.includes('OTHER')
      ? optional(form.special_requirements_other)
      : undefined,
    experiences: form.experiences,
    experience_notes: optional(form.experience_notes),
    experience_style: form.experience_style,
    ...(budget.min !== undefined
      ? {
          budget_currency: 'NGN',
          budget_min: budget.min,
          ...(budget.max !== undefined ? { budget_max: budget.max } : {}),
          budget_covers: form.budget_covers,
        }
      : {}),
    other_preferences: form.other_preferences.length ? form.other_preferences : undefined,
    full_name: form.full_name.trim(),
    email: form.email.trim(),
    whatsapp_number: `${form.country_code}${local}`,
    preferred_contact_method: form.preferred_contact_method,
    additional_notes: optional(form.additional_notes),
    accepted_terms: true,
  };
}

// ---------- Small building blocks ----------

const Label = ({ children, optional }) => (
  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-800">
    {children}
    {optional && <span className="ml-1 font-normal normal-case text-gray-400">(optional)</span>}
  </p>
);

const Chip = ({ selected, onClick, children, className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
      selected ? 'border-[#F4511E] bg-[#F4511E] text-white' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
    } ${className}`}
  >
    {children}
  </button>
);

const Checkbox = ({ checked, onChange, children }) => (
  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded border-gray-300 accent-[#F4511E]"
    />
    {children}
  </label>
);

const Radio = ({ checked, onChange, name, children }) => (
  <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700">
    <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4 accent-[#F4511E]" />
    {children}
  </label>
);

const inputClass =
  'h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#F4511E] focus:outline-none focus:ring-2 focus:ring-orange-100';

const Stepper = ({ label, hint, value, min, onChange }) => (
  <div>
    <div className="mb-2 flex items-baseline justify-between">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-800">{label}</p>
      <span className="text-xs text-gray-400">{hint}</span>
    </div>
    <div className="flex h-12 items-center justify-between rounded-lg border border-gray-200 px-3">
      <button
        type="button"
        aria-label={`Fewer ${label.toLowerCase()}`}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-600 disabled:opacity-40"
      >
        <Minus size={14} />
      </button>
      <span className="text-base font-semibold text-gray-900">{value}</span>
      <button
        type="button"
        aria-label={`More ${label.toLowerCase()}`}
        onClick={() => onChange(Math.min(50, value + 1))}
        className="flex h-7 w-7 items-center justify-center rounded border border-gray-200 text-gray-600"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

// ---------- Wizard ----------

/**
 * The 5-step "Plan Your Lagos Trip" modal. Answers stay in this component and
 * are sent once from step 5. `initial` pre-fills answers (e.g. from a service card).
 */
export default function TripRequestWizard({ open, onClose, initial }) {
  const { data: options, isLoading: optionsLoading, isError: optionsError, refetch } = useConciergeOptions();
  const createRequest = useCreateTripRequest();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setForm({ ...EMPTY_FORM, ...initial });
    setError('');
    setResult(null);
    createRequest.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && !createRequest.isPending && onClose();
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose, createRequest.isPending]);

  const concierge = options?.concierge;
  const set = (field) => (value) => setForm((prev) => ({ ...prev, [field]: value }));
  const nights = useMemo(() => nightsBetween(form.arrival_date, form.departure_date), [form.arrival_date, form.departure_date]);

  if (!open) return null;

  const next = () => {
    const message = validateStep(step, form);
    setError(message || '');
    if (!message) setStep((s) => s + 1);
  };

  const submit = () => {
    const message = validateStep(4, form);
    setError(message || '');
    if (message) return;
    createRequest.mutate(buildPayload(form), {
      onSuccess: (data) => setResult(data),
      onError: (err) => setError(err.message),
    });
  };

  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(result.reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the reference is still on screen */
    }
  };

  const aside = STEP_ASIDE[step];
  const whatsappHelp = concierge?.whatsapp_number ? whatsappLink(concierge.whatsapp_number, 'Hello MyPal Concierge') : null;

  return (
    <div className="concierge-font fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Plan your Lagos trip">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => !createRequest.isPending && onClose()} />

      <div className="relative flex max-h-[95vh] w-full max-w-[900px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-2">
            <img src={mypallogo} alt="" className="h-7 w-7 rounded-md" />
            <span className="font-semibold text-gray-900">MyPal Concierge</span>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded p-1 text-gray-400 hover:text-gray-700" disabled={createRequest.isPending}>
            <X size={20} />
          </button>
        </div>

        {result ? (
          <SuccessScreen
            result={result}
            copied={copied}
            onCopy={copyReference}
            onClose={onClose}
          />
        ) : (
          <div className="flex min-h-0 flex-1">
            {/* Step rail */}
            <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-gray-100 bg-gray-50/60 p-5 md:flex">
              <ol className="space-y-5">
                {STEPS.map((label, i) => (
                  <li key={label} className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        i < step ? 'bg-emerald-500 text-white' : i === step ? 'bg-[#F4511E] text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {i < step ? <Check size={14} /> : i + 1}
                    </span>
                    <span className={`text-sm ${i === step ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>{label}</span>
                  </li>
                ))}
              </ol>
              {whatsappHelp && (
                <div className="border-t border-gray-200 pt-4 text-xs text-gray-500">
                  Need instant assistance?
                  <a href={whatsappHelp} target="_blank" rel="noopener noreferrer" className="mt-1 flex items-center gap-1.5 font-semibold text-emerald-600 hover:underline">
                    <FaWhatsapp /> WhatsApp Concierge
                  </a>
                </div>
              )}
            </aside>

            {/* Step content */}
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
                <p className="mb-1 text-xs font-medium text-[#F4511E] md:hidden">
                  Step {step + 1} of {STEPS.length} · {STEPS[step]}
                </p>

                {optionsLoading ? (
                  <div className="flex h-64 items-center justify-center text-gray-400">
                    <Loader2 className="animate-spin" />
                  </div>
                ) : optionsError ? (
                  <div className="flex h-64 flex-col items-center justify-center gap-3 text-sm text-gray-600">
                    Couldn’t load the trip planner.
                    <button type="button" onClick={() => refetch()} className="font-semibold text-[#F4511E] hover:underline">
                      Try again
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-6">
                    <div className="min-w-0 flex-1">
                      {step === 0 && <TripDetailsStep form={form} set={set} options={options} nights={nights} />}
                      {step === 1 && <TravellersStep form={form} set={set} options={options} />}
                      {step === 2 && <ExperiencesStep form={form} set={set} options={options} />}
                      {step === 3 && <PreferencesStep form={form} set={set} options={options} />}
                      {step === 4 && <DetailsStep form={form} set={set} options={options} />}
                    </div>
                    {step !== 2 && (
                      <StepAside image={aside.image} caption={aside.caption} />
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-100 px-5 py-4 sm:px-7">
                {error && (
                  <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {error}
                  </p>
                )}
                <div className="flex items-center justify-between gap-3">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setStep((s) => s - 1);
                      }}
                      disabled={createRequest.isPending}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <span />
                  )}
                  {step < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      disabled={optionsLoading || optionsError}
                      className="flex items-center gap-2 rounded-lg bg-[#F4511E] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-[#e04617] disabled:opacity-50"
                    >
                      Next <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={createRequest.isPending}
                      className="flex items-center gap-2 rounded-lg bg-[#F4511E] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-[#e04617] disabled:opacity-60"
                    >
                      {createRequest.isPending ? <Loader2 size={16} className="animate-spin" /> : null}
                      Submit Request {!createRequest.isPending && <ArrowRight size={16} />}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepAside({ image, caption }) {
  return (
    <div className="relative hidden h-[290px] w-[240px] shrink-0 overflow-hidden rounded-2xl lg:block">
      <img src={image} alt="" className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <p className="absolute inset-x-4 bottom-4 text-sm text-white">{caption}</p>
    </div>
  );
}

function StepHeading({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
    </div>
  );
}

function TripDetailsStep({ form, set, options, nights }) {
  const today = todayInLagos();
  return (
    <>
      <StepHeading
        title="Plan Your Lagos Trip"
        subtitle="Let’s start with the basics. Tell us about your trip so we can create a personalized Lagos experience for you."
      />
      <div className="space-y-5">
        <div>
          <Label>What brings you to Lagos?</Label>
          <div className="flex flex-wrap gap-2">
            {options.purposes.map(({ value, label }) => (
              <Chip key={value} selected={form.purpose === value} onClick={() => set('purpose')(value)}>
                {label}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <Label>Where are you visiting from?</Label>
          <input
            value={form.visiting_from}
            onChange={(e) => set('visiting_from')(e.target.value)}
            placeholder="e.g. London, United Kingdom"
            className={inputClass}
            maxLength={120}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Arrival date</Label>
            <input
              type="date"
              min={today}
              value={form.arrival_date}
              onChange={(e) => set('arrival_date')(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <Label>Departure date</Label>
            <input
              type="date"
              min={form.arrival_date || today}
              value={form.departure_date}
              onChange={(e) => set('departure_date')(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        {nights > 0 && (
          <p className="-mt-2 text-xs text-gray-500">
            {nights} night{nights === 1 ? '' : 's'}
          </p>
        )}
        <Checkbox checked={form.dates_flexible} onChange={(e) => set('dates_flexible')(e.target.checked)}>
          My travel dates are flexible
        </Checkbox>
      </div>
    </>
  );
}

function TravellersStep({ form, set, options }) {
  return (
    <>
      <StepHeading title="Who’s Travelling?" subtitle="Tell us who will be joining you on this trip." />
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Stepper label="Adults" hint="Ages 13+" value={form.adults} min={1} onChange={set('adults')} />
          <Stepper label="Children" hint="Ages 0–12" value={form.children} min={0} onChange={set('children')} />
        </div>
        <div>
          <Label>Travel style</Label>
          <div className="flex flex-wrap gap-2">
            {options.travel_styles.map(({ value, label }) => (
              <Chip key={value} selected={form.travel_style === value} onClick={() => set('travel_style')(value)}>
                {label}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <Label>Any special requirements?</Label>
          <div className="space-y-2">
            {options.special_requirements.map(({ value, label }) => (
              <Checkbox
                key={value}
                checked={form.special_requirements.includes(value)}
                onChange={() => set('special_requirements')(toggle(form.special_requirements, value))}
              >
                {label}
              </Checkbox>
            ))}
          </div>
          {form.special_requirements.includes('OTHER') && (
            <input
              value={form.special_requirements_other}
              onChange={(e) => set('special_requirements_other')(e.target.value)}
              placeholder="Please specify"
              className={`${inputClass} mt-3`}
              maxLength={500}
            />
          )}
        </div>
      </div>
    </>
  );
}

function ExperiencesStep({ form, set, options }) {
  return (
    <>
      <StepHeading
        title="Choose Your Experiences"
        subtitle="Select the experiences you’re interested in. You can choose as many as you like."
      />
      <div className="flex gap-6">
        <div className="min-w-0 flex-1 space-y-5">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {options.experiences.map(({ value, label }) => {
              const selected = form.experiences.includes(value);
              const image = value === 'OTHER' ? null : CATEGORY_IMAGES[value];
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => set('experiences')(toggle(form.experiences, value))}
                  aria-pressed={selected}
                  className={`relative h-20 overflow-hidden rounded-xl border-2 text-left transition ${
                    selected ? 'border-[#F4511E]' : image ? 'border-transparent' : 'border-dashed border-gray-300'
                  }`}
                >
                  {image ? (
                    <>
                      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
                      <span className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                      <span className="absolute bottom-1.5 left-2 right-7 text-xs font-semibold leading-tight text-white">{label}</span>
                    </>
                  ) : (
                    <span className="flex h-full flex-col items-center justify-center gap-1 px-2 text-center text-xs font-semibold text-gray-700">
                      <Sparkles size={16} className="text-[#F4511E]" />
                      {label}
                    </span>
                  )}
                  <span
                    className={`absolute right-1.5 ${image ? 'bottom-1.5' : 'top-1.5'} flex h-4 w-4 items-center justify-center rounded border ${
                      selected ? 'border-[#F4511E] bg-[#F4511E] text-white' : 'border-white/80 bg-white/30'
                    }`}
                  >
                    {selected && <Check size={11} />}
                  </span>
                </button>
              );
            })}
          </div>
          <div>
            <Label optional>Tell us more about what you have in mind</Label>
            <textarea
              value={form.experience_notes}
              onChange={(e) => set('experience_notes')(e.target.value)}
              placeholder="e.g. rooftop dinner, beach day, private boat, spa day, etc."
              rows={2}
              maxLength={1000}
              className={`${inputClass} h-auto resize-none py-2.5`}
            />
          </div>
        </div>
        <StepAside image={STEP_ASIDE[2].image} caption={STEP_ASIDE[2].caption} />
      </div>
    </>
  );
}

function PreferencesStep({ form, set, options }) {
  return (
    <>
      <StepHeading
        title="Preferences & Budget"
        subtitle="Help us understand your preferences so we can recommend the best options."
      />
      <div className="space-y-5">
        <div>
          <Label>Preferred experience style</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {options.experience_styles.map(({ value, label }) => (
              <Chip
                key={value}
                selected={form.experience_style === value}
                onClick={() => set('experience_style')(value)}
                className="flex min-h-12 items-center justify-center text-center"
              >
                {label}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <Label optional>Estimated budget</Label>
          <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200 focus-within:border-[#F4511E] focus-within:ring-2 focus-within:ring-orange-100">
            <span className="flex items-center border-r border-gray-200 bg-gray-50 px-3 text-sm font-medium text-gray-700">
              {(options.currencies?.[0] || 'NGN')} (₦)
            </span>
            <input
              value={form.budget_text}
              onChange={(e) => set('budget_text')(e.target.value)}
              placeholder="e.g. 500,000 or 500,000 – 1,000,000"
              inputMode="numeric"
              className="min-w-0 flex-1 px-3 text-sm focus:outline-none"
            />
          </div>
        </div>
        <div>
          <Label>What does this budget cover?</Label>
          <div className="space-y-2">
            {options.budget_covers.map(({ value, label }) => (
              <Radio key={value} name="budget_covers" checked={form.budget_covers === value} onChange={() => set('budget_covers')(value)}>
                {label}
              </Radio>
            ))}
          </div>
        </div>
        <div>
          <Label>Any other preferences?</Label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {options.other_preferences.map(({ value, label }) => (
              <Checkbox
                key={value}
                checked={form.other_preferences.includes(value)}
                onChange={() => set('other_preferences')(toggle(form.other_preferences, value))}
              >
                {label}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function DetailsStep({ form, set, options }) {
  return (
    <>
      <StepHeading
        title="Your Details"
        subtitle="Share your contact information so our concierge team can get in touch with your personalized proposal."
      />
      <div className="space-y-5">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label>Full name</Label>
            <input value={form.full_name} onChange={(e) => set('full_name')(e.target.value)} autoComplete="name" className={inputClass} maxLength={120} />
          </div>
          <div>
            <Label>Email address</Label>
            <input type="email" value={form.email} onChange={(e) => set('email')(e.target.value)} autoComplete="email" className={inputClass} maxLength={160} />
          </div>
        </div>
        <div>
          <Label>WhatsApp number</Label>
          <div className="flex h-11 overflow-hidden rounded-lg border border-gray-200 focus-within:border-[#F4511E] focus-within:ring-2 focus-within:ring-orange-100">
            <select
              value={form.country_code}
              onChange={(e) => set('country_code')(e.target.value)}
              aria-label="Country code"
              className="border-r border-gray-200 bg-gray-50 px-2 text-sm text-gray-700 focus:outline-none"
            >
              {COUNTRY_CODES.map(({ code, label }) => (
                <option key={`${code}-${label}`} value={code}>
                  {label} {code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={form.local_number}
              onChange={(e) => set('local_number')(e.target.value)}
              placeholder="803 123 4567"
              autoComplete="tel-national"
              className="min-w-0 flex-1 px-3 text-sm focus:outline-none"
            />
          </div>
        </div>
        <div>
          <Label>Preferred contact method</Label>
          <div className="flex flex-wrap gap-5">
            {options.contact_methods.map(({ value, label }) => (
              <Radio
                key={value}
                name="contact_method"
                checked={form.preferred_contact_method === value}
                onChange={() => set('preferred_contact_method')(value)}
              >
                {label}
              </Radio>
            ))}
          </div>
        </div>
        <div>
          <Label optional>Additional notes</Label>
          <textarea
            value={form.additional_notes}
            onChange={(e) => set('additional_notes')(e.target.value)}
            placeholder="Any special requests or information we should know?"
            rows={2}
            maxLength={2000}
            className={`${inputClass} h-auto resize-none py-2.5`}
          />
        </div>
        <Checkbox checked={form.accepted_terms} onChange={(e) => set('accepted_terms')(e.target.checked)}>
          <span>
            I agree to the{' '}
            <Link to="/terms-and-conditions" target="_blank" className="text-[#F4511E] underline">
              Terms &amp; Conditions
            </Link>{' '}
            and{' '}
            <Link to="/privacy-policy" target="_blank" className="text-[#F4511E] underline">
              Privacy Policy
            </Link>
            .
          </span>
        </Checkbox>
      </div>
    </>
  );
}

function SuccessScreen({ result, copied, onCopy, onClose }) {
  const { delivery = {}, concierge = {} } = result;
  return (
    <div className="flex flex-col items-center overflow-y-auto px-6 py-10 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white">
        <Check size={32} />
      </span>
      <h2 className="mt-5 text-2xl font-bold text-gray-900">Your Lagos Trip Request is Received!</h2>
      <p className="mt-2 max-w-md text-sm text-gray-500">
        Thank you, {result.guest_first_name}. Our concierge team is reviewing your request and will send you a
        personalized proposal shortly.
      </p>

      <div className="mt-6 flex w-full max-w-md items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-left">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">Request reference</p>
          <p className="mt-0.5 flex items-center gap-2 font-mono text-base font-bold text-gray-900">
            {result.reference}
            <button type="button" onClick={onCopy} aria-label="Copy reference" className="text-gray-400 hover:text-gray-700">
              {copied ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
            </button>
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          {result.status_label}
        </span>
      </div>

      <p className="mt-6 text-sm text-gray-700">You’ll receive your proposal via:</p>
      <div className="mt-3 flex flex-wrap justify-center gap-6 text-left">
        {delivery.whatsapp_number && (
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <FaWhatsapp size={16} />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase text-gray-400">WhatsApp</p>
              <p className="text-sm font-medium text-gray-900">{formatPhone(delivery.whatsapp_number)}</p>
            </div>
          </div>
        )}
        {delivery.email && (
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4511E] text-white">
              <Mail size={15} />
            </span>
            <div>
              <p className="text-[10px] font-semibold uppercase text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900 underline">{delivery.email}</p>
            </div>
          </div>
        )}
      </div>
      {result.response_time_label && (
        <p className="mt-4 text-xs text-gray-400">
          Usually within {result.response_time_label}. You can also chat with our concierge team directly on WhatsApp.
        </p>
      )}

      <div className="mt-7 flex gap-3">
        <button type="button" onClick={onClose} className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Close
        </button>
        {concierge.whatsapp_chat_url && (
          <a
            href={concierge.whatsapp_chat_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#F4511E] px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-200 hover:bg-[#e04617]"
          >
            <FaWhatsapp /> Chat on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}
