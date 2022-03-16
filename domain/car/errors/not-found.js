import CarError from "./car-error";

class NotFoundError extends CarError {
  constructor(message) {
    super(message || "user not found");
  }
}

export default NotFoundError;
