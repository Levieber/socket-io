const socket = io();

export function emitRegisterUser({ user, password }) {
  socket.emit("register_user", { user, password });
}

socket.on("user_already_exists", (user) => {
  alert(`Usuário ${user} já existe. Tente outro usuário!`);
});

socket.on("register_user", (result) => {
  if (result?.error) {
    alert(result.error);
  }

  window.location.href = "/login";
});
