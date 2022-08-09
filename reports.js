import { client } from "./index.js";
import express from "express";
const router = express.Router();


router.get("/", async function (request, response) {
  const reports = await client
    .db("Trust-project")
    .collection("reports")
    .find({})
    .toArray();
  // console.log("Reports: " + reports);
  response.send(reports);
});
router.post("/", async function (request, response) {
  const data = request.body;
  // console.log(data);
  const result = await client
    .db("Trust-project")
    .collection("reports")
    .insertMany(data);
  response.send(result);
});
 export const reportsRouter = router;