import rescue from "express-rescue";
import { NotFoundError } from "../../../../domain/car";
import Errors from "../../errors";

const { HttpErrors } = Errors;

const factory = service => [
  rescue(async (req, res) => {
    const car = await service.findOne({ id: req.params.id });

    res.status(200).json(car);
  }),
  (err, req, res, next) => {
    if (err instanceof NotFoundError) {
      return next(new HttpErrors.NotFound({ message: err.message }));
    }

    return next(err);
  },
];

export default { factory };
