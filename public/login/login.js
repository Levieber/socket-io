import { emitSignIn } from "./login-socket.js";

const form = document.getElementById("form-login");

if (document.cookie.includes("token")) {
  window.location.href = "/";
}

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  emitSignIn({
    user: form["input-usuario"].value,
    password: form["input-senha"].value,
  });

  form.reset();
});
