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

/* Bing Webmaster Tools site ownership. Bing's own instruction: do not remove
   this once verification succeeds, or the site falls out of verification. */
export const BING_SITE_VERIFICATION = '1B427C432BFFCC24A7480FD94A21EDD9';
export const WEB3FORMS_KEY = 'dcaae080-0710-41a9-bc82-b41d975f3c19';

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

/* `url` should be a page that uniquely identifies the author, which is what
   Google's Article guidance asks for. Addaptive's about page names David but
   not Mariah, so hers is deliberately absent rather than pointed at a page
   that does not identify her. Add it once she appears there. */
export const AUTHORS = {
  david: {
    name: 'David Benett',
    role: 'Founder, Addaptive',
    url: `${ORG_URL}/about/`,
  },
  mariah: {
    name: 'Mariah Blacker',
    role: 'Consultant, Addaptive',
  },
};

export const abs = (path) => (path === '/' ? SITE_URL : SITE_URL + path);
