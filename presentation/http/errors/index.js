const Errors = {
  HttpErrors: {
    Locked: (await import("./http-errors/locked")).default,
    Conflict: (await import("./http-errors/conflict")).default,
    NotFound: (await import("./http-errors/not-found")).default,
    Forbidden: (await import("./http-errors/forbidden")).default,
    Unauthorized: (await import("./http-errors/unauthorized")).default,
    InternalError: (await import("./http-errors/internal-error")).default,
    ServiceUnavailable: (await import("./http-errors/service-unavailable")).default,
    UnprocessableEntity: (await import("./http-errors/unprocessable-entity")).default,
  },
};

export default Errors;
