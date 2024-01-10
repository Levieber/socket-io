import { emitCreateDocument, emitGetDocuments } from "./documentos-socket.js";

const documentList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const documentNameInput = document.getElementById("input-documento");

function createDocumentItem(name) {
  const link = document.createElement("a");

  Object.assign(link, {
    href: `documento.html?nome=${name}`,
    className: "list-group-item list-group-item-action",
    id: `documento-${name}`,
    innerText: name,
  });

  return link;
}

function updateDocumentList(name) {
  documentList.append(createDocumentItem(name));
}

function removeDocumentItem(name) {
  documentList.removeChild(document.getElementById(`documento-${name}`));
}

emitGetDocuments();

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  emitCreateDocument(documentNameInput.value);
  documentNameInput.value = "";
});

export { updateDocumentList, removeDocumentItem };
