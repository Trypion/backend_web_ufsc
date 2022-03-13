import UserError from "./user-error";

class NotFoundError extends UserError {
  constructor(message) {
    super(message || "user not found");
  }
}

export default NotFoundError;
