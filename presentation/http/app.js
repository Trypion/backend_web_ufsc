import routes from "./routes";
import database from "../../infrastructure/database";

/**
 * Domain
 */
import User from "../../domain/user";

/**
 * Repositories
 */
import UserRepository from "../../infrastructure/repositories/user";

/**
 * Services
 */
import UserService from "../../services/user";

export default async (app, config) => {
  await database.factory(config.database);
  /**
   * Repositories
   */
  const userRepository = new UserRepository(User);
  /**
   * Services
   */
  const userService = new UserService(userRepository);

  app.post("/user", routes.user.create.factory(userService));
};
