export interface Conflict {
  id: string;
  type: "node" | "edge";
  entityId: string;
  conflictingValues: {
    property: string;
    values: unknown[];
    sources: string[];
  }[];
  status: "pending" | "resolved" | "ignored";
  resolution?: {
    value: unknown;
    resolvedBy: string;
    resolvedAt: Date;
    reason: string;
  };
}

export interface DataReview {
  id: string;
  type: "node" | "edge";
  entityId: string;
  changes: {
    property: string;
    oldValue: unknown;
    newValue: unknown;
    source: string;
  }[];
  status: "pending" | "approved" | "rejected";
  reviewer?: string;
  reviewedAt?: Date;
  comments?: string;
}
