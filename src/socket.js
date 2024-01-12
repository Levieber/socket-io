import { documentsFactory } from "./infra/factories/documents-factory.js";
import { authFactory } from "./infra/factories/auth-factory.js";

export function handleRoutes(socket, io) {
  authFactory(socket, io).init();
}

export function handleProtectedRoutes(socket, io) {
  documentsFactory(socket, io).init();
}
