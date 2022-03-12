import HttpError from "../http-error";

export const STATUS = 404;
export const DEFAULT_CODE = "not_found";

class NotFound extends HttpError {
  /**
   * @param  {String} options.message Error message.
   * @param  {String} options.code    Error code.
   */
  constructor({ message, code = DEFAULT_CODE }) {
    super(STATUS, code, message);
  }
}

export default NotFound;
