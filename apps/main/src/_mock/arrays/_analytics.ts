//
import _mock from '../_mock';

// ----------------------------------------------------------------------

export const _analyticPost = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  description: _mock.text.description(index),
  image: _mock.image.cover(index),
  postedAt: _mock.time(index),
}));

export const _analyticOrderTimeline = [...Array(5)].map((_, index) => ({
  id: _mock.id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _mock.time(index),
}));

export const _analyticTraffic = [
  {
    value: 'facebook',
    label: 'FaceBook',
    total: 323234,
  },
  {
    value: 'google',
    label: 'Google',
    total: 341212,
  },
  {
    value: 'linkedin',
    label: 'Linkedin',
    total: 411213,
  },
  {
    value: 'twitter',
    label: 'Twitter',
    total: 443232,
  },
];
