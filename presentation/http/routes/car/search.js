import rescue from "express-rescue";
import { format } from "util";
import middlewares from "../../middlewares";

const validate = middlewares.validationSchema.factory;

const SortDirection = {
  asc: 1,
  des: -1,
};

const factory = service => [
  validate.query({
    type: "object",
    properties: {
      statuses: {
        type: "array",
        items: {
          type: "string",
        },
      },
      page: {
        type: "number",        
        minimum: 1,
      },
      size: {
        type: "number",
        minimum: 1,
        maximum: 200,
      },
      sortBy: {
        type: "string",
      },
      sortDirection: {
        type: "string",
        enum: ["asc", "des"],
      },
      integrations: {
        type: "object",
        properties: {
          stormtech: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
            },
          },
        },
      },
      additionalProperties: false,
    },
  }),
  rescue(async (req, res) => {
    const { page, size, sortBy, sortDirection, ...filters } = req.query;

    const { cars, count, range, total } = await service.search(filters, {
      page,
      size,
      sortBy,
      sortDirection: SortDirection[sortDirection],
    });

    const status = count >= total ? 200 : 206;

    if (status === 206) {
      res.append("x-content-range", format("results %s-%s/%s", range.from, range.to, total));
    }

    res.status(status).json(cars);
  }),
];

export default { factory };
