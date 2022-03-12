import UnprocessableEntity from "../errors/http-errors/unprocessable-entity";
import ValidationError from "../errors/validation-error";

const factory = () => (err, req, res, next) => {
  if (err instanceof ValidationError === false) {
    return next(err);
  }

  return next(
    new UnprocessableEntity({
      message: err.message,
      validations: err.errors,
    })
  );
};

export default { factory };
