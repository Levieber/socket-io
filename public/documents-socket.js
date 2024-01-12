import { getCookie } from "./utils/cookie.js";
import {
  removeDocumentItem,
  updateDocumentList,
  updateUserConnected,
} from "./documents.js";

const socket = io("/protected", {
  auth: {
    token: getCookie("token"),
  },
});

export function emitGetDocuments() {
  socket.emit("get_documents", (documents) => {
    documents.forEach((d) => updateDocumentList(d.name));
  });
}

export function emitCreateDocument(name) {
  socket.emit("create_document", name);
}

socket.on("create_document", (documentName) => {
  updateDocumentList(documentName);
});

socket.on("document_already_exists", (documentName) => {
  alert(`Documento ${documentName} já existente!`);
});

socket.on("delete_document", (documentName) => {
  removeDocumentItem(documentName);
});

socket.on("authentication_success", (user) => {
  updateUserConnected(user);
});

socket.on("connect_error", () => {
  window.location.href = `/login?returnUrl=${window.location.pathname}`;
});
