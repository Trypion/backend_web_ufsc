import rescue from "express-rescue";
import middlewares from "../../middlewares";
import { NotFoundError } from "../../../../domain/user";
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
    await service.update({ id: req.params.id, ...req.body });

    res.status(204).end();
  }),
  (err, req, res, next) => {
    if (err instanceof NotFoundError) {
      return next(new HttpErrors.NotFound({ message: err.message }));
    }

    return next(err);
  },
];

export default { factory };
