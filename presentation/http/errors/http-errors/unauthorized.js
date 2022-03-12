import HttpError from "../http-error";

export const STATUS = 401;
export const DEFAULT_CODE = "unauthorized";

class Unauthorized extends HttpError {
  /**
   * @param  {String} options.message Error message.
   * @param  {String} options.code    Error code.
   */
  constructor({ message, code = DEFAULT_CODE }) {
    super(STATUS, code, message);
  }
}

export default Unauthorized;
