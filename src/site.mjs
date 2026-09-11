/* Site-wide constants. Change a value here and every generated page follows. */

/* Canonical origin. The Vercel project must serve this hostname directly and
   redirect the other one to it, otherwise every canonical tag points at a
   redirect. See HANDOFF.md for the current mismatch. */
export const SITE_URL = 'https://copilot-training.com.au';

export const SITE_NAME = 'Microsoft Copilot Training Australia';
export const ORG_NAME = 'Addaptive';
export const ORG_LEGAL_NAME = 'Addaptive Enterprises Pty Ltd';
export const ORG_URL = 'https://addaptive.com.au';
export const ORG_ABN = '93 685 138 327';
export const EMAIL = 'david@addaptive.com.au';

export const GA_MEASUREMENT_ID = 'G-25YBT0GGK9';
export const WEB3FORMS_KEY = 'dcaae080-0710-41a9-bc82-b41d975f3c19';

/* Secondary, lower-friction conversion. Not yet supplied. `npm run verify`
   fails while this placeholder is in place, so it cannot reach production
   unnoticed. Replace with the live Microsoft Bookings page. */
export const BOOKING_URL = 'BOOKING_URL_PENDING';
export const BOOKING_READY = BOOKING_URL !== 'BOOKING_URL_PENDING';

/* Order here drives the header, the footer and the sitemap. */
export const SERVICES = [
  {
    path: '/copilot-workshop',
    navLabel: 'Copilot Workshop',
    navBlurb: 'Half or full day, hands on',
    cardTag: 'Workshop',
    title: 'Copilot Workshop',
  },
  {
    path: '/capability-program',
    navLabel: 'Copilot Capability Program',
    navBlurb: 'Multi-session, tiered by experience',
    cardTag: 'Structured Program',
    title: 'Copilot Capability Program',
  },
  {
    path: '/embedded-adoption-support',
    navLabel: 'Embedded Adoption Support',
    navBlurb: 'Ongoing advisory retainer',
    cardTag: 'Ongoing Advisory',
    title: 'Embedded Adoption Support',
  },
];

export const AUTHORS = {
  david: {
    name: 'David Benett',
    role: 'Founder, Addaptive',
    url: ORG_URL,
  },
  mariah: {
    name: 'Mariah Blacker',
    role: 'Consultant, Addaptive',
    url: ORG_URL,
  },
};

export const abs = (path) => (path === '/' ? SITE_URL : SITE_URL + path);
