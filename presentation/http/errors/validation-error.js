import Error from "./error";

class ValidationError extends Error {
  /**
   * @param  {String          message Error message.
   * @param  {Array<Object>}  errors  Descriptive error for each failed
   *                                  validation.
   */
  constructor(message, errors) {
    super(message);

    this.errors = errors;
  }
}
export default ValidationError;
