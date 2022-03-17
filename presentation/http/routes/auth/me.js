import rescue from "express-rescue";
import { NotFoundError } from "../../../../domain/user";
import Errors from "../../errors";

const { HttpErrors } = Errors;

const factory = service => [
  rescue(async (req, res) => {
    const user = await service.findOne({ id: req.user });

    res.status(200).json(user);
  }),
  (err, req, res, next) => {
    if (err instanceof NotFoundError) {
      return next(new HttpErrors.NotFound({ message: err.message }));
    }

    return next(err);
  },
];

export default { factory };
