import { withThemeByClassName } from '@storybook/addon-themes';
import { themes } from '@storybook/theming';
import '../src/styles/global.css'; // Import Tailwind CSS

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
	docs: {
      theme: themes.light, // hoặc themes.dark
    },
    layout: 'padded',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a202c' },
      ],
    },
  },
  // Storybook 8 uses a more modular approach with decorators
  decorators: [
    // Decorator để áp dụng theme cho các stories
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
