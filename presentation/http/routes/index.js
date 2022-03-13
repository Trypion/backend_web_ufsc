export default {
  user: {
    create: (await import("./user/create")).default,
  },
};
