import { paramCase, snakeCase } from 'change-case';

// ----------------------------------------------------------------------

const getHref = (category: string, name: string) => `/components/${category}/${paramCase(name)}`;

export const foundation = ['Colors', 'Typography', 'Shadows', 'Grid', 'Icons'].map((name) => ({
  name,
  href: getHref('foundation', name),
  icon: `/assets/icons/components/ic_${snakeCase(name)}.png`,
}));

export const mui = [
  'Accordion',
  'Alert',
  'Autocomplete',
  'Avatar',
  'Badge',
  'Breadcrumbs',
  'Buttons',
  'Checkbox',
  'Chip',
  'Dialog',
  'List',
  'Menu',
  'Pagination',
  'Pickers',
  'Popover',
  'Progress',
  'Radio Button',
  'Rating',
  'Slider',
  'Stepper',
  'Switch',
  'Table',
  'Tabs',
  'Textfield',
  'Timeline',
  'Tooltip',
  'Transfer List',
  'TreeView',
  'Data Grid',
].map((name) => ({
  name: name,
  href: getHref('mui', name),
  icon: `/assets/icons/components/ic_${snakeCase(name)}.png`,
}));

export const extra = [
  'Chart',
  'Map',
  'Editor',
  'Copy to clipboard',
  'Upload',
  'Carousel',
  'Multi language',
  'Animate',
  'Mega Menu',
  'Form Validation',
  'Lightbox',
  'Image',
  'Label',
  'Scroll',
  'Snackbar',
  'Text Max Line',
  'Navigation Bar',
  'Organization Chart',
].map((name) => ({
  name: name,
  href: getHref('extra', name),
  icon: `/assets/icons/components/ic_extra_${snakeCase(name)}.png`,
}));
