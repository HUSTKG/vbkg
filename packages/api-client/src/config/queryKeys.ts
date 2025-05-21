export const QueryKeys = Object.freeze({
  datasources: {
    list: (filter?: any) => ["datasources", "list", filter],
    details: (id: string) => ["datasources", "details", id],
    create: () => ["datasources", "create"],
    update: (id: string) => ["datasources", "update", id],
    delete: (id: string) => ["datasources", "delete", id],
  },
  fileUploads: {
    list: (filter?: any) => ["fileUploads", "list", filter],
    details: (id: string) => ["fileUploads", "details", id],
    content: (id: string) => ["fileContent", id],
    publicUrl: (id: string) => ["filePublicUrl", id],
  },
});
