export default {
  user: {
    find: (await import("./user/find")).default,
    create: (await import("./user/create")).default,
    update: (await import("./user/update")).default,
    delete: (await import("./user/delete")).default,
    search: (await import("./user/search")).default,
  },
};
