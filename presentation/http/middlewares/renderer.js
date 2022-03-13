import UnprocessableEntity from "../errors/http-errors/unprocessable-entity";

/**
 * @param   {Error} err Instance of error.
 * @return  {Boolean}   Whether validation errors should be displayed.
 */
const shouldDisplayValidationErrors = err =>
  err instanceof UnprocessableEntity && err.validations.length > 0;

/**
 * @param   {String}  environment Current environment name.
 * @return  {Boolean}             Whether error stack should be displayed.
 */
const shouldDisplayErrorStack = environment => environment !== "production";

/**
 * @param  {String}   environment Current environment name.
 * @return {Function}             Middleware.
 */
const factory =
  (environment = "development") =>
  (err, req, res) => {
    const { code, message, status } = err;

    const validations = shouldDisplayValidationErrors(err) ? err.validations : undefined;

    const stack = shouldDisplayErrorStack(environment) ? err.stack : undefined;

    res.status(status).json({ status, error: { code, message, stack, validations } });
  };

export default { factory };
