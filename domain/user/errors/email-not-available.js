import UserError from "./user-error";

class EmailNotAvailableError extends UserError {
  constructor(message) {
    super(message || "email already in use");
  }
}

export default EmailNotAvailableError;
