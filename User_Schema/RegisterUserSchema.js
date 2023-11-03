import Joi from "joi";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    require: true,
    type: String,
    minlength: 3,
    maxlength: 18,
  },
  lastName: {
    require: true,
    type: String,
    minlength: 3,
    maxlength: 18,
  },
  email: {
    require: true,
    type: String,
    minlength: 7,
    maxlength: 25,
    unique: true,
  },
  password: {
    require: true,
    type: String,
    minlength: 7,
    maxlength: 300,
  },
  // tokens: [
  //   {
  //     token: {
  //       require: true,
  //       type: String,
  //     },
  //   },
  // ],
});

const User = mongoose.model("RegisterUser", userSchema);

const ValidateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(18).required(),
    lastName: Joi.string().min(3).max(18).required(),
    email: Joi.string().min(7).max(25).required().email(),
    password: Joi.string().min(7).max(25).required(),
    // confirmPassword: Joi.string().min(7).max(25).required(),
    // tokens: Joi.object({ token: Joi.string().required() }),
  });
  return schema.validate(user);
};

export { User, ValidateUser };
