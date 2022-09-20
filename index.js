import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { usersRouter } from "./users.js";
import { reportRouter } from "./report.js";
import { volunteerRouter } from "./volunteer.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const volunteer=[
  {
   "name": "ajay",
   "email": "ajay@gmail.com",
   "number": 1234567890,
   "city": "hyderabad",
   "state": "telangana",
   "pincode": 123456,
   "id": "1"
  },
  {
   "name": "ajay 1",
   "email": "ajay1@email.com",
   "number": 1223456789,
   "city": "hyderabad 1",
   "state": "telangana",
   "pincode": 123456,
   "id": "2"
  },
  {
   "name": "ajay 3",
   "email": "ajay3@email.com",
   "number": 1234567893,
   "city": "hyderabad 3",
   "state": "telangana 3",
   "pincode": 123456,
   "id": "3"
  },
  {
   "name": "ajay 4",
   "email": "ajay4@email.com",
   "number": 1234567846,
   "city": "hyderabad 4",
   "state": "telangana4",
   "pincode": 123456,
   "id": "4"
  },
  {
   "name": "ajay 5",
   "email": "ajay5@email.com",
   "number": 1234567868,
   "city": "hyderabad5",
   "state": "telangana 5",
   "pincode": 612347,
   "id": "5"
  }
 ]
app.use(cors());
app.use(express.json());

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
app.get("/volunteer", function (request, response) {
  response.send(volunteer);
})

app.use("/users", usersRouter);
app.use("/reports", reportRouter);
app.use("/volunteer", volunteerRouter);
app.listen(PORT, () => console.log(`App started in ${PORT}`));
