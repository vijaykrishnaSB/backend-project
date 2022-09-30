import express from "express";
import { client } from "./index.js";
import { createReport } from "./function.js";
const router = express.Router();

router.get("/", async function (req, res) {
  const reports = await client
    .db("Trust-project")
    .collection("reports")
    .find({})
    .toArray();
  res.send(reports);
});

router.post("/report", async function (req, res) {
  const result = await createReport(req.body);
  res.send(result);
});

export const reportRouter = router;
