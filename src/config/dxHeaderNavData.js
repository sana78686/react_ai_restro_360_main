/**
 * Deliverect-style header mega menus — AI Restro 360 copy.
 * `slug` routes to `/:lang/:slug` (ComingSoon) when not a path.
 */

export const DX_SOLUTIONS = [
  {
    columnKey: 'dxHeader.solCol1',
    items: [
      { titleKey: 'dxHeader.sol1t', subKey: 'dxHeader.sol1s', slug: 'voice-ordering' },
      { titleKey: 'dxHeader.sol2t', subKey: 'dxHeader.sol2s', slug: 'table-ordering' },
      { titleKey: 'dxHeader.sol3t', subKey: 'dxHeader.sol3s', slug: 'kiosk-ordering' },
    ],
  },
  {
    columnKey: 'dxHeader.solCol2',
    items: [
      { titleKey: 'dxHeader.sol4t', subKey: 'dxHeader.sol4s', slug: 'kitchen-display' },
      { titleKey: 'dxHeader.sol5t', subKey: 'dxHeader.sol5s', slug: 'prep-queue' },
      { titleKey: 'dxHeader.sol6t', subKey: 'dxHeader.sol6s', slug: 'inventory-insights' },
    ],
  },
  {
    columnKey: 'dxHeader.solCol3',
    items: [
      { titleKey: 'dxHeader.sol7t', subKey: 'dxHeader.sol7s', slug: 'delivery-sync' },
      { titleKey: 'dxHeader.sol8t', subKey: 'dxHeader.sol8s', slug: 'loyalty-crm' },
      { titleKey: 'dxHeader.sol9t', subKey: 'dxHeader.sol9s', slug: 'analytics' },
    ],
  },
  {
    columnKey: 'dxHeader.solCol4',
    items: [
      { titleKey: 'dxHeader.sol10t', subKey: 'dxHeader.sol10s', slug: 'marketing-ai' },
      { titleKey: 'dxHeader.sol11t', subKey: 'dxHeader.sol11s', slug: 'reviews' },
      { titleKey: 'dxHeader.sol12t', subKey: 'dxHeader.sol12s', slug: 'partner-api' },
    ],
  },
]

/** Middle column: { titleKey, path: 'tools' | 'blog' | slug } */
export const DX_INTEGRATIONS_OUR = [
  { titleKey: 'dxHeader.intMid1', path: 'tools', icon: 'pos' },
  { titleKey: 'dxHeader.intMid2', path: 'tools', icon: 'delivery' },
  { titleKey: 'dxHeader.intMid3', slug: 'online-ordering', icon: 'phone' },
  { titleKey: 'dxHeader.intMid4', slug: 'onsite-ordering', icon: 'kiosk' },
  { titleKey: 'dxHeader.intMid5', slug: 'dispatch', icon: 'pin' },
  { titleKey: 'dxHeader.intMid6', slug: 'loyalty-crm', icon: 'heart' },
]

export const DX_INTEGRATIONS_PARTNERS = [
  { titleKey: 'dxHeader.intP1', path: 'contact' },
  { titleKey: 'dxHeader.intP2', path: 'contact' },
  { titleKey: 'dxHeader.intP3', path: 'contact' },
  { titleKey: 'dxHeader.intP4', path: 'contact' },
  { titleKey: 'dxHeader.intP5', path: 'contact', icon: 'partner' },
  { titleKey: 'dxHeader.intP6', slug: 'build-integration', icon: 'wrench' },
]

export const DX_RESOURCES = [
  {
    columnKey: 'dxHeader.resCol1',
    items: [
      { titleKey: 'dxHeader.res1', path: 'blog' },
      { titleKey: 'dxHeader.res2', path: 'tools' },
      { titleKey: 'dxHeader.res3', path: 'blog' },
    ],
  },
  {
    columnKey: 'dxHeader.resCol2',
    items: [
      { titleKey: 'dxHeader.res4', path: 'contact' },
      { titleKey: 'dxHeader.res5', hash: 'landing-faq' },
      { titleKey: 'dxHeader.res6', path: 'contact' },
    ],
  },
  {
    columnKey: 'dxHeader.resCol3',
    items: [
      { titleKey: 'dxHeader.res7', path: 'page/about' },
      { titleKey: 'dxHeader.res8', path: 'contact' },
      { titleKey: 'dxHeader.res9', path: 'tools' },
    ],
  },
]
