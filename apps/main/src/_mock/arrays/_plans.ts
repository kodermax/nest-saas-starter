// ----------------------------------------------------------------------

const LICENSES = ['Standard', 'Standard Plus', 'Extended'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['One end products', '12 months updates', '6 months of support'],
  options: [
    'JavaScript version',
    'TypeScript version',
    'Design Resources',
    'Commercial applications',
  ],
  icons: [
    '/assets/icons/platforms/ic_sketch.svg',
    '/assets/icons/platforms/ic_figma.svg',
    '/assets/icons/platforms/ic_js.svg',
    '/assets/icons/platforms/ic_ts.svg',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'basic',
    price: 0,
    caption: 'forever',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: false },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'current plan',
  },
  {
    subscription: 'starter',
    price: 4.99,
    caption: 'saving $24 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    price: 9.99,
    caption: 'saving $124 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: true },
      { text: 'Permissions & workflows', isAvailable: true },
    ],
    labelAction: 'choose premium',
  },
];
