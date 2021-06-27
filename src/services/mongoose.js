import mongoose from "mongoose";
import { MONGO_DATABASE } from "../config";

mongoose.connection.on("error", (err) => {
  console.log("Mongoose Connection error" + err.message);
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

export const mongooseConnect = () => {
  mongoose.connect(MONGO_DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return mongoose.connection;
};

export default mongooseConnect;
