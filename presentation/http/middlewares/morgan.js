import morgan from "morgan";
import merge from "lodash.merge";

const factory = ({ format, ...config }, environment) => {
  const options = merge(config, {
    skip: () => environment === process.env.TEST,
  });

  return morgan(format, options);
};

export default { factory };
