import { saveCookie } from "../utils/cookie.js";

const socket = io();

export function emitSignIn({ user, password }) {
  socket.emit("sign_in", { user, password });
}

socket.on("sign_in", (result) => {
  if (result?.error) {
    alert(result.error);
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  saveCookie("token", result.token);
  window.location.href = searchParams.get("returnUrl") ?? "/";
});
