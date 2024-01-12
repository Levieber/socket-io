const connections = [];

export function getConnection(documentName, user) {
  return connections.find(
    (c) => c.user === user && c.document === documentName
  );
}

export function getUsersConnected(documentName) {
  return connections
    .filter((c) => c.document === documentName)
    .map((c) => c.user);
}

export function addConnection(documentName, user) {
  connections.push({ document: documentName, user });
}

export function removeConnection(documentName, user) {
  const connectionToRemoveIndex = connections.findIndex(
    (c) => c.document === documentName && c.user === user
  );

  if (connectionToRemoveIndex !== -1) {
    connections.splice(connectionToRemoveIndex, 1);
  }
}
