export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  avatar?: string;
  bio?: string;
  settings: UserSettings;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: NotificationSettings;
  visualization: VisualizationSettings;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  frequency: 'immediate' | 'daily' | 'weekly';
}

export interface VisualizationSettings {
  layout: 'force' | 'hierarchical' | 'circular';
  nodeSize: number;
  edgeWidth: number;
  colors: {
    nodes: Record<string, string>;
    edges: Record<string, string>;
  };
}
