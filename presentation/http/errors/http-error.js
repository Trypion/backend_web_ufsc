import Error from "./error";

class HttpError extends Error {
  /**
   * @param  {Number} status  HTTP status code.
   * @param  {String} code    Custom error code.
   * @param  {String} message Error message.
   */
  constructor(status, code, message) {
    super(message);

    this.code = code;
    this.status = status;
  }
}

export default HttpError;
