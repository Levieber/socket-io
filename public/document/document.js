import {
  emitDeleteDocument,
  emitEditedText,
  emitSaveDocumentText,
  emitUnsavedText,
  selectDocument,
} from "./document-socket.js";

const searchParams = new URLSearchParams(window.location.search);
const documentName = searchParams.get("name");

const textEditor = document.getElementById("editor-texto");
const saveDocumentTextButton = document.getElementById("salvar-documento");
const deleteDocumentButton = document.getElementById("excluir-documento");
const saveDocumentAlert = document.getElementById("salvar-documento-alert");
const documentTitle = document.getElementById("titulo-documento");
const connectedUsersList = document.getElementById("usuarios-conectados");

documentTitle.innerText = documentName || "Documento sem título";
const pageTitle = `Documento ${documentName}` || "Documento sem título";
document.title = pageTitle;

let savedText;

function initialize(documentText) {
  updateTextEditor(documentText);
  savedText = documentText;
}

function saveDocument() {
  emitSaveDocumentText({ text: textEditor.value, documentName });
  removeUnsavedDisplay();
}

function connectToDocument({ username }) {
  selectDocument({ documentName, username });
}

function displayUnsavedText() {
  document.title = pageTitle + " (Não Salvo)";
  saveDocumentAlert.classList.remove("d-none");
}

function removeUnsavedDisplay() {
  document.title = pageTitle;
  saveDocumentAlert.classList.add("d-none");
}

textEditor.addEventListener("input", () => {
  emitEditedText({ text: textEditor.value, documentName });

  if (savedText !== textEditor.value) {
    emitUnsavedText(textEditor.value);
    displayUnsavedText();
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.ctrlKey && evt.key === "s") {
    evt.preventDefault();
    saveDocument();
  }
});

saveDocumentTextButton.addEventListener("click", () => {
  saveDocument();
});

deleteDocumentButton.addEventListener("click", () => {
  emitDeleteDocument(documentName);
});

function updateTextEditor(text) {
  textEditor.value = text;
}

function addUserConnected(user) {
  const item = document.createElement("li");

  Object.assign(item, {
    className: "list-group-item text-capitalize",
    innerText: user,
  });

  connectedUsersList.append(item);
}

function updateConnectedUsers(users) {
  connectedUsersList.innerHTML = "";

  users.forEach((u) => addUserConnected(u));
}

function feedbackDeletedDocument(name) {
  if (documentName === name) {
    alert(`Documento ${name} foi excluído!`);
    window.location.href = "/";
  }
}

function feedbackDocumentAlreadyOpen(name) {
  alert(`Documento ${name} já aberto em outra aba!`);
  window.location.href = "/";
}

export {
  initialize,
  updateTextEditor,
  feedbackDeletedDocument,
  feedbackDocumentAlreadyOpen,
  connectToDocument,
  updateConnectedUsers,
  displayUnsavedText,
  removeUnsavedDisplay,
};
