import HttpError from "../http-error";

export const STATUS = 422;
export const DEFAULT_CODE = "unacceptable_payload_schema";

class UnprocessableEntity extends HttpError {
  /**
   * @param  {String}         optinos.message     Error message.
   * @param  {String}         options.code        Error code.
   * @param  {Array<Object>}  options.validaitons Descriptive array of failed
   *                                              validations.
   */
  constructor({ message, code = DEFAULT_CODE, validations = [] }) {
    super(STATUS, code, message);

    this.validations = validations;
  }
}

export default UnprocessableEntity;
