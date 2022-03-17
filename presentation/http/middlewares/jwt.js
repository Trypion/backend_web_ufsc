import Errors from "../errors";

const { HttpErrors } = Errors;

const factory =
  ({ audience }, jwt) =>
  (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new HttpErrors.Unauthorized({ message: "Token not found" });
    }

    const [, tokenValue] = token.split(" ");

    try {
      const { id } = jwt.verify(tokenValue, audience);

      req.user = id;
    } catch (err) {
      throw new HttpErrors.Unauthorized({ message: "Invalid token" });
    }

    next();
  };

export default { factory };
