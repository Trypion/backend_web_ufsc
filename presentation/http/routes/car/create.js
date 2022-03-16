import rescue from "express-rescue";
import middlewares from "../../middlewares";
import { NotFoundError } from "../../../../domain/car";
import Errors from "../../errors";

const { HttpErrors } = Errors;

const validate = middlewares.validationSchema.factory;

const factory = service => [
  validate({
    type: "object",
    required: ["model", "price", "description", "photo"],
    properties: {
      model: {
        type: "string",
      },
      photo: {
        type: "string",
      },
      price: {
        type: "number",
      },
      description: {
        type: "string",
      },
    },
  }),
  rescue(async (req, res) => {
    const { id } = await service.create(req.body);

    res.status(201).json({ id });
  }),
  (err, req, res, next) => {
    if (err instanceof NotFoundError) {
      return next(new HttpErrors.NotFound({ message: err.message }));
    }

    return next(err);
  },
];

export default { factory };
