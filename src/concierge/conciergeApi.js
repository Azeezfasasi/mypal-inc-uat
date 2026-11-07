// MyPal Concierge public API (docs/CONCIERGE_FRONTEND_INTEGRATION_GUIDE.md Â§3).
// Proposal calls carry the customer's access token in the query string. Treat it
// like a password: never log it or send it anywhere but these endpoints.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiHeaders, apiUrl } from '../lib/api';

/** Error carrying the HTTP status, so screens can branch on 404 / 409 / 429 */
export class ConciergeApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const RATE_LIMIT_MESSAGE = 'Too many attempts. Please wait a minute and try again.';

async function request(path, { method = 'GET', body } = {}) {
  let res;
  try {
    res = await fetch(apiUrl(path), {
      method,
      headers: apiHeaders(body ? { 'Content-Type': 'application/json' } : {}),
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ConciergeApiError('Network error. Check your connection and try again.', 0);
  }
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const message = res.status === 429 ? RATE_LIMIT_MESSAGE : json?.message;
    throw new ConciergeApiError(
      (Array.isArray(message) ? message.join('. ') : message) || 'Something went wrong. Please try again.',
      res.status
    );
  }
  return json?.data;
}

const proposalPath = (reference, token, suffix = '') =>
  `/concierge/proposals/${encodeURIComponent(reference)}${suffix}?token=${encodeURIComponent(token)}`;

export const conciergeKeys = {
  options: ['concierge', 'options'],
  proposal: (reference) => ['concierge', 'proposal', reference],
};

/** Labelled choices for the wizard and the concierge contacts â cached for the session */
export const useConciergeOptions = () =>
  useQuery({
    queryKey: conciergeKeys.options,
    queryFn: () => request('/concierge/options'),
    staleTime: Infinity,
    retry: 1,
  });

export const useCreateTripRequest = () =>
  useMutation({ mutationFn: (payload) => request('/concierge/requests', { method: 'POST', body: payload }) });

/**
 * The whole proposal view. It refreshes when the tab regains focus so supplier
 * confirmations and the payment link show up without a reload.
 */
export const useProposal = (reference, token) =>
  useQuery({
    queryKey: conciergeKeys.proposal(reference),
    queryFn: () => request(proposalPath(reference, token)),
    enabled: Boolean(reference && token),
    refetchOnWindowFocus: true,
    refetchInterval: 3 * 60 * 1000,
    // 4xx means a wrong, malformed or replaced link, so retrying won’t help
    retry: (count, error) => !(error?.status >= 400 && error?.status < 500) && count < 2,
  });

/** Mutations that return the full proposal view replace the cached one */
const useProposalMutation = (reference, token, suffix, method, toBody) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input) => request(proposalPath(reference, token, suffix), { method, body: toBody(input) }),
    onSuccess: (view) => {
      if (view?.reference) queryClient.setQueryData(conciergeKeys.proposal(reference), view);
    },
  });
};

export const useUpdateSelection = (reference, token) =>
  useProposalMutation(reference, token, '/selection', 'PUT', (ids) => ({ selected_item_ids: ids }));

export const useApproveProposal = (reference, token) =>
  useProposalMutation(reference, token, '/approve', 'POST', (ids) => ({
    declaration_accepted: true,
    selected_item_ids: ids,
  }));

/** kind: "change-requests" | "questions" */
export const useSendProposalMessage = (reference, token) =>
  useMutation({
    mutationFn: ({ kind, message }) =>
      request(proposalPath(reference, token, `/${kind}`), { method: 'POST', body: { message } }),
  });

/** The PDF is a binary attachment; the filename is built here (Content-Disposition may be unreadable cross-origin) */
export async function downloadProposalPdf(reference, token) {
  const res = await fetch(apiUrl(proposalPath(reference, token, '/pdf')), { headers: apiHeaders() });
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new ConciergeApiError(res.status === 429 ? RATE_LIMIT_MESSAGE : json?.message || 'Could not download the PDF', res.status);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: `MyPal-Concierge-Proposal-${reference}.pdf`,
  });
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
