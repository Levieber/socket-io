export class UserRepository {
  #client;

  constructor(client) {
    this.#client = client.db("alura-docs").collection("users");
  }

  findByUser(user) {
    return this.#client.findOne({ user })
  }

  create({ user, password, salt }) {
    return this.#client.insertOne({ user, password, salt });
  }
}
