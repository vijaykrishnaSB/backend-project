import express from "express";
import { client } from "./index.js";
import { createVolunteer } from "./function.js";
const router = express.Router();

router.get("/volunteer", async function (req, res) {
  const volunteer = await client
    .db("Trust-project")
    .collection("volunteer")
    .find({})
    .toArray();
  res.send(volunteer);
});
router.post("/posting", async function (req, res) {
  const { name, email, number, city, state, pincode } = req.body;
  const results = await createVolunteer({
    name: name,
    email: email,
    number: number,
    city: city,
    state: state,
    pincode: pincode,
  });
  res.send(results);
});
export const volunteerRouter = router;
