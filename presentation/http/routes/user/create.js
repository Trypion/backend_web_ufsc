import rescue from "express-rescue";
import middlewares from "../../middlewares";
import { NotFoundError, EmailNotAvailableError } from "../../../../domain/user";
import Errors from "../../errors";

const { HttpErrors } = Errors;

const validate = middlewares.validationSchema.factory;

const factory = service => [
  validate({
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
      },
      email: {
        type: "string",
      },
      password: {
        type: "string",
      },
    },
  }),
  rescue(async (req, res) => {
    const { id } = await service.create(req.body);

    res.status(201).json({ id });
  }),
  (err, req, res, next) => {
    if (err instanceof EmailNotAvailableError) {
      return next(new HttpErrors.Conflict({ message: err.message }));
    }

    if (err instanceof NotFoundError) {
      return next(new HttpErrors.NotFound({ message: err.message }));
    }

    return next(err);
  },
];

export default { factory };
