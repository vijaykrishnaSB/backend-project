import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { reportsRouter } from "./reports.js";
import { usersRouter } from "./users.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// const MONGO_URL = "mongodb://localhost";
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("Mongo connected successfully");
  return client;
}

export const client = await createConnection();

app.get("/", function (request, response) {
  response.send(" Hi This Is My Trust-project");
});

app.use("/reports", reportsRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => console.log(`App started in ${PORT}`));
