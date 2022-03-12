import HttpError from "../errors/http-error";

const factory = () => (err, req, res, next) => {
  if (!(err instanceof HttpError)) {
    console.error(err, req);
  }

  return next(err);
};

export default { factory };
