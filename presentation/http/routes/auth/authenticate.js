import rescue from "express-rescue";
import middlewares from "../../middlewares";
import { NotFoundError } from "../../../../domain/car";
import Errors from "../../errors";

const { HttpErrors } = Errors;

const validate = middlewares.validationSchema.factory;

const factory = service => [
  validate({
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  }),
  rescue(async (req, res) => {
    const { token } = await service.login(req.body);

    res.status(201).json({ token });
  }),
  (err, req, res, next) => {
    if (err instanceof NotFoundError) {
      return next(new HttpErrors.NotFound({ message: err.message }));
    }

    return next(err);
  },
];

export default { factory };
