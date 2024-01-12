import {
  addConnection,
  getConnection,
  getUsersConnected,
  removeConnection,
} from "../data/document-connections.js";

export class DocumentsController {
  #service;
  #socket;
  #io;

  constructor(service, socket, io) {
    this.#service = service;
    this.#socket = socket;
    this.#io = io;
  }

  init() {
    this.#socket.on("get_documents", async (updateDocuments) => {
      updateDocuments(await this.#service.findAll().toArray());
    });

    this.#socket.on("create_document", async (documentName) => {
      const result = await this.#service.create({ name: documentName });

      if (result === null) {
        this.#socket.emit("document_already_exists", documentName);
        return;
      }

      if (result.acknowledged) {
        this.#io.emit("create_document", documentName);
      }
    });

    this.#socket.on(
      "select_document",
      async ({ documentName, username }, updateDocumentPage) => {
        const document = await this.#service.findByName(documentName);

        if (document) {
          this.#socket.join(documentName);

          if (getConnection(documentName, username)) {
            this.#socket.emit("document_already_open", documentName);
          } else {
            addConnection(documentName, username);

            this.#socket.data = {
              userConnected: true,
            };

            this.#io
              .to(documentName)
              .emit("user_connection", getUsersConnected(documentName));

            updateDocumentPage(document.text);
          }
        }

        this.#socket.on("unsaved_text", (text) => {
          this.#io.to(documentName).emit("unsaved_text", text);
        });

        this.#socket.on("edited_text", ({ text, documentName }) => {
          this.#socket.to(documentName).emit("edited_text", text);
        });

        this.#socket.on(
          "save_document_text",
          async ({ text, documentName }) => {
            await this.#service.updateOne({ name: documentName, text });
            this.#io.to(documentName).emit("save_document_text", text);
          }
        );

        this.#socket.on("delete_document", async (documentName) => {
          const result = await this.#service.deleteOne({ name: documentName });

          if (result.deletedCount) {
            this.#io.emit("delete_document", documentName);
          }
        });

        this.#socket.on("disconnect", () => {
          if (!this.#socket.data.userConnected) {
            return;
          }

          removeConnection(documentName, username);
          this.#io
            .to(documentName)
            .emit("user_connection", getUsersConnected(documentName));
        });
      }
    );
  }
}
