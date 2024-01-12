import { databaseClient } from "../../server.js";
import { DocumentRepository } from "../repositories/document-repository.js";
import { DocumentsService } from "../../services/documents-service.js";
import { DocumentsController } from "../../controllers/documents-controller.js";

export function documentsFactory(socket, io) {
  const documentRepository = new DocumentRepository(databaseClient);
  const documentService = new DocumentsService(documentRepository);
  return new DocumentsController(documentService, socket, io);
}
