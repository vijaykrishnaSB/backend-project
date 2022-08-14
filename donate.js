import { client } from "./index.js";
import express from "express";
const router = express.Router();

router.post("/", async function (request, response) {
  const data = request.body;
  const result = await client
    .db("Trust-project")
    .collection("donate")
    .insertMany(data);
  response.send(result);
});
export const donateRouter = router;
