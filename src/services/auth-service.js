import { HashPassword } from "../infra/cryptography/hash-password.js";
import { JwtHandler } from "../infra/token/jwt-handler.js";

export class AuthService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async registerUser({ user, password }) {
    const userAlreadyExists =
      (await this.#repository.findByUser(user)) !== null;

    if (userAlreadyExists) {
      return null;
    }

    const { hashedPassword, salt } = HashPassword.hash(password);

    return this.#repository.create({ user, password: hashedPassword, salt });
  }

  async signIn({ user: username, password }) {
    const user = await this.#repository.findByUser(username);

    if (!user) {
      return { authenticated: false, token: null };
    }

    const samePassword = HashPassword.compare(
      user.password,
      password,
      user.salt
    );

    if (!samePassword) {
      return { authenticated: false, token: null };
    }

    const token = JwtHandler.generateToken({ username });

    return { authenticated: true, token };
  }
}
