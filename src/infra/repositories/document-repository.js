export class DocumentRepository {
  #client;

  constructor(client) {
    this.#client = client.db("alura-docs").collection("documents");
  }

  findByName(name) {
    return this.#client.findOne({ name });
  }

  findAll() {
    return this.#client.find();
  }

  create({ name }) {
    return this.#client.insertOne({ name, text: "" });
  }

  updateOne({ name }, newContent) {
    const setter = {};

    for (const [key, value] of Object.entries(newContent)) {
      if (value !== undefined) {
        setter[key] = value;
      }
    }

    return this.#client.updateOne(
      { name },
      {
        $set: setter,
      }
    );
  }

  deleteOne({ name }) {
    return this.#client.deleteOne({ name });
  }
}
