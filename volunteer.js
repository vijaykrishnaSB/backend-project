import express from "express";
import { client } from "./index.js";
import { createVolunteer } from "./function.js";


const router = express.Router();

router.get("/", async function (req, res) {
  const volunteer = await client
    .db("Trust-project")
    .collection("volunteer")
    .find({})
    .toArray();
  res.send(volunteer);
});
router.post("/posting", async function (req, res) {
  const results = await createVolunteer(req.body);
  res.send(results);
});

router.get("/posting/:id", async function (req, res) {
  const reports = await client
    .db("Trust-project")
    .collection("volunteer")
    .findOne({ id: req.params.id });
  res.send(reports);
});
// router.get("/posting/:id", async function (req, res) {
//   const reports = await getVolunteerById(req.params.id);
//   res.send(reports);
// });
router.put("/posting/:id", async function (req, res) {
  const reports = await client
    .db("Trust-project")
    .collection("volunteer")
    .updateOne({ id: req.params.id }, { $set: req.body });
  res.send(reports);
});
// router.put("/posting/:id", async function (req, res) {
//   const reports = await updateVolunteer(req.params.id);
//   res.send(reports);
// });

export const volunteerRouter = router;
