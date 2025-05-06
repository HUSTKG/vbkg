// Utility
export * from './lib/utils';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


import "./styles/global.css";

export * from './components/icons';

// Layout Components
export { default as AppLayout } from './layouts/main';
export type { AppLayoutProps, MenuItem, MenuSubItem } from './layouts/main';

// Data Display Components
export { default as EntityCard } from './components/entity-card';
export type { EntityCardProps, EntityProperty, EntityRelation } from './components/entity-card';

export { default as ResultCard } from './components/result-card';
export type { ResultCardProps, ResultProperty, ResultRelation } from './components/result-card';

export { default as StatisticCard, NodeStatisticCard, RelationStatisticCard, ConflictStatisticCard, UserStatisticCard } from './components/statistic-card';
export type { StatisticCardProps } from './components/statistic-card';

// Activity and Notification Components
export { default as RecentActivityItem, formatTimeAgo, DataAddedActivity, ConflictDetectedActivity, ErrorActivity, InfoActivity } from './components/recent-activity-item';
export type { RecentActivityItemProps, ActivityStatus } from './components/recent-activity-item';

export { default as NotificationItem, SuccessNotification, WarningNotification, ErrorNotification, InfoNotification } from './components/notification-item';
export type { NotificationItemProps, NotificationType } from './components/notification-item';

// Ontology Components
export { default as OntologyGraph } from './components/ontology-graph';
export type { OntologyGraphProps, OntologyClass as OntologyGraphClass, OntologyRelation as OntologyGraphRelation } from './components/ontology-graph';

export { default as ClassDetails } from './components/class-details';
export type { ClassDetailsProps, OntologyClass, OntologyProperty } from './components/class-details';

// Search, Navigation, and User Interface Components
export { default as SearchBar } from './components/search-bar';
export type { SearchBarProps, SearchHistory } from './components/search-bar';

export { default as UserDropdown } from './components/user-dropdown';
export type { UserDropdownProps, UserMenuLink } from './components/user-dropdown';

export { SidebarMenu, SidebarMenuItem, SidebarSubItem, SidebarHomeItem } from './components/sidebar-menu';
export type { SidebarMenuProps, SidebarMenuItemProps, SidebarSubItemProps } from './components/sidebar-menu';

// Dialog and Feedback Components
export { 
  default as ConfirmDialog, 
  createDialog, 
  InfoDialog, 
  WarningDialog, 
  ErrorDialog, 
  SuccessDialog, 
  DeleteDialog 
} from './components/confirm-dialog';
export type { ConfirmDialogProps, ConfirmDialogType } from './components/confirm-dialog';

export { 
  default as EmptyState, 
  SearchEmptyState, 
  DataEmptyState, 
  ErrorEmptyState, 
  LoadingEmptyState 
} from './components/empty-state';
export type { EmptyStateProps, EmptyStateType } from './components/empty-state';

export { default as AppForm } from './components/form';
export type { FieldConfig } from './components/form';

export { default as Dialog } from './components/dialog';

export {CustomDrawer} from './components/drawers';

// Shadcn Components
// These are re-exports from the shadcn components we've installed
export * from './components/ui/button';
export * from './components/ui/card';
export * from './components/ui/input';
export * from './components/ui/navigation-menu';
export * from './components/ui/table';
export * from './components/ui/tabs';
