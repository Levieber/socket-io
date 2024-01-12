import { emitRegisterUser } from "./register-socket.js";

const form = document.getElementById("form-cadastro");

if (document.cookie.includes("token")) {
  window.location.href = "/";
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  emitRegisterUser({
    user: form["input-usuario"].value,
    password: form["input-senha"].value,
  });

  form.reset();
});
