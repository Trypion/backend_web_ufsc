import rescue from "express-rescue";
import { NotFoundError } from "../../../../domain/car";
import Errors from "../../errors";

const { HttpErrors } = Errors;

const factory = service => [
  rescue(async (req, res) => {
    await service.delete({ id: req.params.id });

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
