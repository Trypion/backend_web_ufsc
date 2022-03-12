import express from "express";
import cors from "cors";
import helmet from "helmet";
import config from "../../config";
import middlewares from "./middlewares";

// express server
const app = express();

// express settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(config.cors));
app.use(helmet());

// express middlewares
app.use(middlewares.morgan.factory(config.morgan, config.environment));
app.use(middlewares.stderr.factory());
app.use(middlewares.validationErrors.factory());

// express port
app.listen(config.server.port, () => {
  console.log("server is running on port 8080");
});
