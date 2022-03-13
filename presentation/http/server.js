import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyparser from "body-parser";
import config from "../../config";
import middlewares from "./middlewares";

// import morgan from "./middlewares/morgan";
// import validationSchema from "./middlewares/validation-schema";
// import validationErrors from "./middlewares/validation-errors";
// import renderer from "./middlewares/renderer";
// import normalizer from "./middlewares/normalizer";
// import stderr from "./middlewares/stderr";


import presentation from "./app";

// express server
const app = express();

// express settings
// app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.cors));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(middlewares.morgan.factory(config.morgan));

await presentation(app, config);

app.use(middlewares.validationErrors.factory());
app.use(middlewares.normalizer.factory());
app.use(middlewares.stderr.factory());
app.use(middlewares.renderer.factory(config.environment));

// express middlewares

// express port
app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}`);
});
