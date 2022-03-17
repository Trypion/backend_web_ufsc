import routes from "./routes";
import database from "../../infrastructure/database";
import Jwt from "../../lib/jwt";

/**
 * Domain
 */
import User from "../../domain/user";
import Car from "../../domain/car";

/**
 * Repositories
 */
import UserRepository from "../../infrastructure/repositories/user";
import CarRepository from "../../infrastructure/repositories/car";

/**
 * Services
 */
import UserService from "../../services/user";
import CarService from "../../services/car";
import AuthService from "../../services/auth";

export default async (app, config) => {
  const jwt = Jwt.factory(config.jwt);
  await database.factory(config.database);
  /**
   * Repositories
   */
  const userRepository = new UserRepository(User);
  const carRepository = new CarRepository(Car);
  /**
   * Services
   */
  const userService = new UserService(userRepository);
  const carService = new CarService(carRepository);
  const authService = new AuthService(userRepository, jwt);

  app.post("/auth/login", routes.auth.authenticate.factory(authService));

  app.get("/user", routes.user.search.factory(userService));
  app.post("/user", routes.user.create.factory(userService));
  app.get("/user/:id", routes.user.find.factory(userService));
  app.patch("/user/:id", routes.user.update.factory(userService));
  app.delete("/user/:id", routes.user.delete.factory(userService));

  app.get("/car", routes.car.search.factory(carService));
  app.post("/car", routes.car.create.factory(carService));
  app.get("/car/:id", routes.car.find.factory(carService));
  app.patch("/car/:id", routes.car.update.factory(carService));
  app.delete("/car/:id", routes.car.delete.factory(carService));
};
