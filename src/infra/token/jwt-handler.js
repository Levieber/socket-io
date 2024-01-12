import jsonwebtoken from "jsonwebtoken";

export class JwtHandler {
  static #secret = process.env.JWT_SECRET;

  static generateToken(payload) {
    const token = jsonwebtoken.sign(payload, this.#secret, {
      expiresIn: "3h",
    });

    return token;
  }

  static verify(token) {
    return jsonwebtoken.verify(token, this.#secret);
  }
}
