import express from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByName } from "./function.js";
import jwt from "jsonwebtoken";
const router = express.Router();

async function genHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

router.post("/signup", async function (req, res) {
  const { username, password } = req.body;

  const userFromDB = await getUserByName(username);

  if (userFromDB) {
    res.status(400).send({ message: "username already exists" });
  } else {
    const hashedPassword = await genHashedPassword(password);
    console.log(hashedPassword);

    const result = await createUser({
      username: username,
      password: hashedPassword,
    });
    res.send(result);
  }
});

router.post("/login", async function (req, res) {
  const { username, password } = req.body;

  const userFromDB = await getUserByName(username);
  console.log(userFromDB);


  if (!userFromDB) {
    res.status(401).send({ message: "Invalid credentials" });
  } else {
    const storedPassword = userFromDB.password;
    const isPasswordMatch = await bcrypt.compare(password, storedPassword);
    console.log(isPasswordMatch);

    if (isPasswordMatch) {
      const token = jwt.sign({id:userFromDB._id}, process.env.SECRET_KEY);
      res.send({ message: "Successfully login", token: token});
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  }
});

export const usersRouter = router;
