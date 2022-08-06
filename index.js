import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 4000;

// const reports = [
//   {
//     id: "100",
//     name: "Ram Rao",
//     emailid: "trust@gmail.com",
//     mobilenumber: 1123456789,
//     date: "21-07-2022",
//     address: "h.no:1-2-00,123 street,trust road",
//     district: "district",
//     state: "state",
//     pincode: 500000,
//     reasonofreporting:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//   },
//   {
//     id: "101",
//     name: " Mythili",
//     emailid: "trust1@gmail.com",
//     mobilenumber: 1223456789,
//     date: "22-07-2022",
//     address: "h.no:1-2-11,123 street,trust road",
//     district: "district1",
//     state: "state1",
//     pincode: 500001,
//     reasonofreporting:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//   },
//   {
//     id: "102",
//     name: " lakshman ",
//     emailid: "trsust2@gmail.com",
//     mobilenumber: 1233456789,
//     date: "23-07-2022",
//     address: "h.no:1-22,123 street,trust road",
//     district: "district2",
//     state: "state2",
//     pincode: 500002,
//     reasonofreporting:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//   },
//   {
//     id: "103",
//     name: "Hanumma",
//     emailid: "trust4@gmail.com",
//     mobilenumber: 1234456789,
//     date: "24-07-2022",
//     address: "h.no:13-2-33,123 street,trust road",
//     district: "district3",
//     state: "state3",
//     pincode: 500003,
//     reasonofreporting:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//   },
//   {
//     id: "104",
//     name: " bharata",
//     emailid: "trust5@gmail.com",
//     mobilenumber: 1234556789,
//     date: "25-07-2022",
//     address: "h.no:1-2-44,123 street,trust road",
//     district: "district4",
//     state: "state4",
//     pincode: 500004,
//     reasonofreporting:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//   },
// ];
app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = (process.env.MONGO_URL);

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo connected successfully");
  return client;
}

const client = await createConnection();

app.get("/", function (request, response) {
  response.send(" Hi This Is My Trust-project");
});

app.get("/reports", async function (request, response) {
  const reports = await client
    .db("Trust-project")
    .collection("reports")
    .find({})
    .toArray();
  console.log("Reports: " + reports);
  response.send(reports);
});

app.post("/reports", async function (request, response) {
  const data = request.body;
  console.log(data);
  const result = await client
    .db("Trust-project")
    .collection("reports")
    .insertMany(data);
  response.send(result);
});

app.listen(PORT, () => console.log(`App started in ${PORT}`));
