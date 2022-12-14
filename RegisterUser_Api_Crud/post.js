import express from "express";
import { User, ValidateUser } from "../User_Schema/RegisterUserSchema.js";
import bcrypt from "bcrypt";

import CreateJwt from "../CreateJwt/CreateJwt.js";

const registerUserRouter = express.Router();

registerUserRouter.post("/api/User", async (req, res) => {
  const { error, value } = ValidateUser(req.body);
  if (error) return res.status(401).send(error.details[0].message);

  const checkUserEmail = await User.findOne({ email: value.email });
  if (checkUserEmail) return res.status(400).send("User Already Exist");

  if (value.password === value.confirmPassword) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(value.password, salt);
    const user = await creatRegisterUser(res, value, hashedPassword);

    const result = await user.save();

    return res.send(result);
  } else {
    return res.status(400).send("Password not matched");
  }
});

registerUserRouter.get("/api/User", async (req, res) => {
  const result = await User.find();

  res.send(result);
});

registerUserRouter.put("/api/User/:id", async (req, res) => {
  const result = await User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  res.send(result);
});

registerUserRouter.delete("/api/User/:id", async () => {
  const result = await User.findByIdAndRemove(req.params.id);
  if (!result) res.status(404).send("Not Find This id");
  res.send(result);
});

export default registerUserRouter;

const creatRegisterUser = async (res, value, hashedPassword) => {
  let user = new User({
    name: value.name,
    email: value.email,
    password: hashedPassword,
  });
  const token = CreateJwt(user);
  user.tokens = user.tokens.concat({ token });
  return user;
};
