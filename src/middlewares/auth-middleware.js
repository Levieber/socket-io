import { JwtHandler } from "../infra/token/jwt-handler.js";

export function authMiddleware(socket, next) {
  try {
    const payload = JwtHandler.verify(socket.handshake.auth.token);

    socket.emit("authentication_success", payload);

    next();
  } catch (error) {
    next(error);
  }
}
