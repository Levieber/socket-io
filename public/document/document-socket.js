import { getCookie } from "../utils/cookie.js";
import {
  connectToDocument,
  feedbackDeletedDocument,
  updateTextEditor,
  updateConnectedUsers,
  displayUnsavedText,
  initialize,
  removeUnsavedDisplay,
  feedbackDocumentAlreadyOpen,
} from "./document.js";

const socket = io("/protected", {
  auth: {
    token: getCookie("token"),
  },
});

function selectDocument({ documentName, username }) {
  socket.emit("select_document", { documentName, username }, initialize);
}

function emitUnsavedText(text) {
  socket.emit("unsaved_text", text);
}

function emitEditedText({ text, documentName }) {
  socket.emit("edited_text", { text, documentName });
}

function emitSaveDocumentText({ text, documentName }) {
  socket.emit("save_document_text", { text, documentName });
}

function emitDeleteDocument(documentName) {
  socket.emit("delete_document", documentName);
}

socket.on("edited_text", (text) => {
  updateTextEditor(text);
});

socket.on("delete_document", (documentName) => {
  feedbackDeletedDocument(documentName);
});

socket.on("authentication_success", connectToDocument);

socket.on("user_connection", updateConnectedUsers);

socket.on("connect_error", () => {
  window.location.href = `/login?returnUrl=${
    window.location.pathname + window.location.search
  }`;
});

socket.on("unsaved_text", (documentText) => {
  updateTextEditor(documentText);
  displayUnsavedText();
});

socket.on("save_document_text", (documentText) => {
  updateTextEditor(documentText);
  removeUnsavedDisplay();
});

socket.on("document_already_open", (documentName) => {
  feedbackDocumentAlreadyOpen(documentName);
});

export {
  selectDocument,
  emitEditedText,
  emitSaveDocumentText,
  emitDeleteDocument,
  emitUnsavedText,
};
