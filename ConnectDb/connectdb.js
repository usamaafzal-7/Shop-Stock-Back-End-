import mongoose from "mongoose";

const DbConnection = () => {
  return mongoose
    .connect("mongodb+srv://DBConnect5000:DBConnect5000@cluster0.oyobxmi.mongodb.net/Elo?retryWrites=true&w=majority")
    .then(() => console.log("MongoDb is Connected"))
    .catch((error) => console.log(error.message));
};

export default DbConnection;
