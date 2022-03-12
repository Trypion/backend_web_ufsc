import HttpError from "../http-error";

export const STATUS = 500;
export const DEFAULT_CODE = "internal_error";

class InternalError extends HttpError {
  /**
   * @param  {String} options.message Error message.
   * @param  {String} options.stack   Error stack.
   */
  constructor({ message, stack }) {
    super(STATUS, DEFAULT_CODE, message);

    this.stack = stack;
  }
}

export default InternalError;
