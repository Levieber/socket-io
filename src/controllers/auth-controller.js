export class AuthController {
  #service;
  #socket;

  constructor(service, socket) {
    this.#service = service;
    this.#socket = socket;
  }

  init() {
    this.#socket.on("register_user", async (registerData) => {
      const result = await this.#service.registerUser(registerData);

      if (result === null) {
        this.#socket.emit("user_already_exists", registerData.user);
        return;
      }

      if (result.acknowledged) {
        this.#socket.emit("register_user", registerData);
      } else {
        this.#socket.emit("register_user", {
          error: "Cadastro do usuário falhou!",
        });
      }
    });

    this.#socket.on("sign_in", async (signInData) => {
      const result = await this.#service.signIn(signInData);

      if (result.authenticated) {
        this.#socket.emit("sign_in", result);
      } else {
        this.#socket.emit("sign_in", { error: "Senha ou usuário incorreto" });
      }
    });
  }
}
