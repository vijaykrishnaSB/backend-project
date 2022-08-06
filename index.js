import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = 4000;

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
