import { client } from "./index.js";

export async function createUser(data) {
  return await client.db("Trust-project").collection("users").insertOne(data);
}

export async function getUserByName(email) {
  return await client
    .db("Trust-project")
    .collection("users")
    .findOne({ email: email });
}

