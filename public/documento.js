import {
  emitDeleteDocument,
  emitEditedText,
  emitSaveDocumentText,
  selectDocument,
} from "./documento-socket.js";

const searchParams = new URLSearchParams(window.location.search);
const documentName = searchParams.get("nome");

const textEditor = document.getElementById("editor-texto");
const saveDocumentTextButton = document.getElementById("salvar-documento");
const deleteDocumentButton = document.getElementById("excluir-documento");
const saveDocumentAlert = document.getElementById("salvar-documento-alert");
const documentTitle = document.getElementById("titulo-documento");

documentTitle.innerText = documentName || "Documento sem título";
const pageTitle = `Documento ${documentName}` || "Documento sem título";
document.title = pageTitle;

function saveDocument() {
  emitSaveDocumentText({ text: textEditor.value, documentName });
  document.title = pageTitle;
  saveDocumentAlert.classList.add("d-none");
}

selectDocument(documentName);

textEditor.addEventListener("input", () => {
  emitEditedText({ text: textEditor.value, documentName });
  document.title = pageTitle + " (Não Salvo)";
  saveDocumentAlert.classList.remove("d-none");
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

function updateTextEditor(texto) {
  textEditor.value = texto;
}

function feedbackDeletedDocument(name) {
  if (documentName === name) {
    alert(`Documento ${name} foi excluído!`);
    window.location.href = "/";
  }
}

export { updateTextEditor, feedbackDeletedDocument };
