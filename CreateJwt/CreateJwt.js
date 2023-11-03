import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const CreateJwt = (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  return token;
};

export default CreateJwt;
