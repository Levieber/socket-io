import { emitCreateDocument, emitGetDocuments } from "./documents-socket.js";
import { getCookie, removeCookie } from "./utils/cookie.js";

const documentList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const logoutButton = document.getElementById("botao-logout");
const userConnected = document.getElementById("usuario");

function createDocumentItem(name) {
  const link = document.createElement("a");

  Object.assign(link, {
    href: `/document?name=${name}`,
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

function updateUserConnected(user) {
  userConnected.innerText = user.username;
}

emitGetDocuments();

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  emitCreateDocument(form["input-documento"].value);
  form.reset();
});

logoutButton.addEventListener("click", () => {
  removeCookie("token");
  window.location.href = "/login";
});

export { updateDocumentList, removeDocumentItem, updateUserConnected };
