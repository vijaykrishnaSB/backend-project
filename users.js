import express from "express";
import { client } from "./index.js";
import bcrypt from "bcrypt";

const router = express.Router();

async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


async function getUserByName(username) {
    return await client 
    .db("Trust-project")
    .collection("users")
    .insertOne({
      username: username,
    });
}



router.post("/signup", async function (req, res) {
  const { username, password } = req.body;

  const userFromDB = await getUserByName(username);

  if (userFromDB) {
    res.status(400).send({ message: "username already exists" });
  } else {
    const hashedPassword = await genHashedPassword(password);
    console.log(hashedPassword);

    const result = await client
      .db("Trust-project")
      .collection("users")
      .insertOne({
        username: username,
        password: hashedPassword,
      });
        res.send(result);
  }
});

export const usersRouter = router;
