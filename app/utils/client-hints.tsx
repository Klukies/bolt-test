import { getHintUtils } from '@epic-web/client-hints';
import { clientHint as timeZone } from '@epic-web/client-hints/time-zone';

import { useRequestInfo } from './request-info';

const clientHintUtils = getHintUtils({ timeZone });

export const getClientHints = (request: Request) => clientHintUtils.getHints(request);

/**
 * @returns inline script element that checks for client hints and sets cookies if they are not set.
 * Reloads the page if any cookie was set to an inaccurate value.
 */
export const ClientHintsCheck = () => {
  return (
    // eslint-disable-next-line @eslint-react/dom/no-dangerously-set-innerhtml
    <script dangerouslySetInnerHTML={{ __html: clientHintUtils.getClientHintCheckScript() }} />
  );
};

export const useClientHints = () => {
  return useRequestInfo().clientHints;
};
