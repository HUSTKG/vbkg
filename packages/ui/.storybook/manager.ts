import { addons } from '@storybook/manager-api';
import KnowledgeGraphTheme from './KGTheme';

addons.setConfig({
  theme: KnowledgeGraphTheme,
  sidebar: {
    showRoots: true,
  },
});
