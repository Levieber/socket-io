import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const databaseClient = new MongoClient(process.env.DB_URL);

  await databaseClient.connect();
  console.log("Connected with database successfully!")

  return databaseClient;
}
