export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  expiresAt?: Date;
  lastUsed?: Date;
  permissions: string[];
}
