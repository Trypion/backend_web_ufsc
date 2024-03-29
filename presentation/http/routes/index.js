export default {
  user: {
    find: (await import("./user/find")).default,
    create: (await import("./user/create")).default,
    update: (await import("./user/update")).default,
    delete: (await import("./user/delete")).default,
    search: (await import("./user/search")).default,
  },
  car: {
    find: (await import("./car/find")).default,
    create: (await import("./car/create")).default,
    update: (await import("./car/update")).default,
    delete: (await import("./car/delete")).default,
    search: (await import("./car/search")).default,
  },
  auth: {
    authenticate: (await import("./auth/authenticate")).default,
    me: (await import("./auth/me")).default,
  },
};
