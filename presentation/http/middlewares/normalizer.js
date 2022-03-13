import InternalError from "../errors/http-errors/internal-error";
import HttpError from "../errors/http-error";
/**
 * @return {Function} Middleware.
 */
const factory = () => (err, req, res, next) => {
  if (err instanceof HttpError === false) {
    return next(new InternalError({ message: err.message, stack: err.stack }));
  }

  return next(err);
};

export default { factory };
