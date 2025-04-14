import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  
  // Branding
  brandTitle: 'Knowledge Graph UI',
  brandUrl: 'https://your-website.com',
  brandTarget: '_self',
  
  // Colors
  colorPrimary: '#3b82f6', // blue-500
  colorSecondary: '#2563eb', // blue-600
  
  // UI
  appBg: '#f9fafb', // gray-50
  appContentBg: '#ffffff',
  appBorderColor: '#e5e7eb', // gray-200
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#1f2937', // gray-800
  textInverseColor: '#ffffff',
  
  // Toolbar default and active colors
  barTextColor: '#6b7280', // gray-500
  barSelectedColor: '#3b82f6', // blue-500
  barBg: '#ffffff',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#d1d5db', // gray-300
  inputTextColor: '#1f2937', // gray-800
  inputBorderRadius: 4,
});
