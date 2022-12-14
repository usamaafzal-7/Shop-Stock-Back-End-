import mongoose from "mongoose";

const DbConnection = () => {
  return mongoose
    .connect("mongodb://localhost:27017/E-commerce_Website")
    .then(() => console.log("MongoDb is Connected"))
    .catch((error) => console.log(error.message));
};

export default DbConnection;
