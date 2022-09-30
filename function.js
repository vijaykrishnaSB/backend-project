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

export async function createReport(data) {
  return await client.db("Trust-project").collection("reports").insertOne(data);
}

export async function createVolunteer(data) {
  return await client
    .db("Trust-project")
    .collection("volunteer")
    .insertOne(data);
}

// export async function updateVolunteer(data){
//   return await client
//   .db("Trust-project")
//   .collection("volunteer")
//   .updateOne({ id: req.params.id }, { $set: req.body });
// }
// export async function getVolunteerById(data){
//   return await client
//   .db("Trust-project")
//   .collection("volunteer")
//   .findOne({ id: req.params.id });
// }