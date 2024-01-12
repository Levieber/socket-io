export class DocumentsService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async create({ name }) {
    const documentAlreadyExists =
      (await this.#repository.findByName(name)) !== null;

    if (documentAlreadyExists) {
      return null;
    }

    return this.#repository.create({ name });
  }

  findAll() {
    return this.#repository.findAll();
  }

  findByName(name) {
    return this.#repository.findByName(name);
  }

  updateOne({ name, text }) {
    return this.#repository.updateOne({ name }, { name, text });
  }

  deleteOne({ name }) {
    return this.#repository.deleteOne({ name });
  }
}
