import { feedbackDeletedDocument, updateTextEditor } from "./documento.js";

const socket = io();

function selectDocument(documentName) {
  socket.emit("select-document", documentName, (documentText) => {
    updateTextEditor(documentText);
  });
}

function emitEditedText({ text, documentName }) {
  socket.emit("edited-text", { text, documentName });
}

function emitSaveDocumentText({ text, documentName }) {
  socket.emit("save-document-text", { text, documentName });
}

function emitDeleteDocument(documentName) {
  socket.emit("delete-document", documentName);
}

socket.on("edited-text", (text) => {
  updateTextEditor(text);
});

socket.on("delete-document", (documentName) => {
  feedbackDeletedDocument(documentName);
});

export {
  selectDocument,
  emitEditedText,
  emitSaveDocumentText,
  emitDeleteDocument,
};
