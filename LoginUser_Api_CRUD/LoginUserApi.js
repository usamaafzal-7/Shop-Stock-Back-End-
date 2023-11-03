import express from "express";
import { User } from "../User_Schema/RegisterUserSchema.js";
import bcrypt from "bcrypt";
import CreateJwt from "../CreateJwt/CreateJwt.js";
const loginUserRouter = express.Router();

loginUserRouter.post("/api/LoginUser", async (req, res) => {
  console.log(req.body);
  const userEmail = await User.findOne({ email: req.body.email });
  if (!userEmail) return res.status(400).send("User Doesn't Exist");
  const isMatch = await bcrypt.compare(req.body.password, userEmail.password);
  if (isMatch) {
    const token = CreateJwt(userEmail);
    console.log(token);
    return res.send(token);
  } else {
    return res.status(400).send("Password not matched");
  }
});

export default loginUserRouter;
