import { databaseClient } from "../../server.js";
import { UserRepository } from "../repositories/user-repository.js";
import { AuthService } from "../../services/auth-service.js";
import { AuthController } from "../../controllers/auth-controller.js";

export function authFactory(socket) {
  const userRepository = new UserRepository(databaseClient);
  const authService = new AuthService(userRepository);
  return new AuthController(authService, socket);
}
