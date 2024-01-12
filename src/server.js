import { fileURLToPath } from "node:url";
import path from "node:path";
import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import { connectDatabase } from "./infra/database/connect-database.js";
import { handleProtectedRoutes, handleRoutes } from "./socket.js";
import { authMiddleware } from "./middlewares/auth-middleware.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
export const databaseClient = await connectDatabase();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");

app.use(express.static(publicDir));

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const protectedNamespace = io.of("/protected")

protectedNamespace.use(authMiddleware);

protectedNamespace.on("connection", (socket) => {
  console.log("Client connected! ID:", socket.id);

  handleProtectedRoutes(socket, protectedNamespace);
});

io.of("/").on("connection", (socket) => {
  console.log("Client connected! ID:", socket.id);

  handleRoutes(socket, io);
});
