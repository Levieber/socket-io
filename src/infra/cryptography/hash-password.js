import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

export class HashPassword {
  static #createPasswordHash(password, salt) {
    return scryptSync(password, salt, 64);
  }

  static hash(password, salt = randomBytes(16).toString("hex")) {
    const hashedPassword = this.#createPasswordHash(password, salt).toString(
      "hex"
    );

    return { hashedPassword, salt };
  }

  static compare(password, passwordToCompare, salt) {
    const testHash = this.#createPasswordHash(passwordToCompare, salt);

    const realHash = Buffer.from(password, "hex");

    return timingSafeEqual(testHash, realHash);
  }
}
