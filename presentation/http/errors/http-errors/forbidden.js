import HttpError from "../http-error";

export const STATUS = 403;
export const DEFAULT_CODE = "forbidden";

class Forbidden extends HttpError {
  /**
   * @param {String}  optinos.message Error message.
   * @param {String}  options.code    Error code.
   */
  constructor({ message, code = DEFAULT_CODE }) {
    super(STATUS, code, message);
  }
}

export default Forbidden;
