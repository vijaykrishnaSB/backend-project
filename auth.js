import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth.token");
    console.log(token);
    jwt.verify(token.env.SECRET_KEY);
    next();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};
