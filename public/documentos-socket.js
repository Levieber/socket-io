import { removeDocumentItem, updateDocumentList } from "./documentos.js";

const socket = io();

export function emitGetDocuments() {
  socket.emit("get-documents", (documents) => {
    documents.forEach((d) => updateDocumentList(d.name));
  });
}

export function emitCreateDocument(name) {
  socket.emit("create-document", name);
}

socket.on("create-document", (documentName) => {
  updateDocumentList(documentName);
});

socket.on("document-already-exists", (documentName) => {
  alert(`Documento ${documentName} já existente!`);
});

socket.on("delete-document", (documentName) => {
  removeDocumentItem(documentName);
});
