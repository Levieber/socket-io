import { documentRepository, io } from "./server.js";

export function handleSocket(socket) {
  socket.on("get-documents", async (updateDocuments) => {
    updateDocuments(await documentRepository.findAll());
  });

  socket.on("create-document", async (documentName) => {
    const documentAlreadyExists =
      (await documentRepository.findByName(documentName)) !== null;

    if (documentAlreadyExists) {
      socket.emit("document-already-exists", documentName);
      return;
    }

    const result = await documentRepository.create({ name: documentName });

    if (result.acknowledged) {
      io.emit("create-document", documentName);
    }
  });

  socket.on("delete-document", async (documentName) => {
    const result = await documentRepository.deleteOne(documentName);

    if (result.deletedCount) {
      io.emit("delete-document", documentName);
    }
  });

  socket.on("select-document", async (documentName, updateTextEditor) => {
    socket.join(documentName);

    const document = await documentRepository.findByName(documentName);

    if (document) {
      updateTextEditor(document.text);
    }
  });

  socket.on("edited-text", ({ text, documentName }) => {
    socket.to(documentName).emit("edited-text", text);
  });

  socket.on("save-document-text", async ({ text, documentName }) => {
    await documentRepository.updateOne(documentName, { text });
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected! Reason: ${reason}`);
  });
}
