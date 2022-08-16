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
  const {
    name,
    emailid,
    mobilenumber,
    date,
    address,
    district,
    state,
    pincode,
    reasonofreporting,
  } = req.body;
  const result = await createReport({
    name: name,
    emailid: emailid,
    mobilenumber: mobilenumber,
    date: date,
    address: address,
    district: district,
    state: state,
    pincode: pincode,
    reasonofreporting: reasonofreporting,
  });
  res.send(result);
});
export const reportRouter = router;
