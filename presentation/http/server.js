import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import config from "../../config";
// import middlewares from "./middlewares";

import morgan from "./middlewares/morgan";
// import validationSchema from "./middlewares/validation-schema";
import validationErrors from "./middlewares/validation-errors";
import renderer from "./middlewares/renderer";
import normalizer from "./middlewares/normalizer";
import stderr from "./middlewares/stderr";


import presentation from "./app";

// express server
const app = express();

// express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.cors));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(helmet());

await presentation(app, config);

// express middlewares
app.use(morgan.factory(config.morgan));
app.use(validationErrors.factory());
app.use(normalizer.factory());
app.use(stderr.factory());
app.use(renderer.factory(config.environment));

app.get("/ping", (req, res) => {
  res.send("pong");
});

// express port
app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}`);
});
