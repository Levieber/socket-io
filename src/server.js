import { fileURLToPath } from "node:url";
import path from "node:path";
import http from "node:http";
import express from "express";
import { Server } from "socket.io";
import { connectDatabase } from "./infra/database/connect-database.js"
import { DocumentRepository } from "./infra/repositories/document-repository.js"
import { handleSocket } from "./socket.js";

const app = express();
const server = http.createServer(app);
export const io = new Server(server);
const databaseClient = await connectDatabase();
export const documentRepository = new DocumentRepository(databaseClient);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "..", "public");

app.use(express.static(publicDir));

const PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log("Client connected! ID:", socket.id);

  handleSocket(socket);
});
