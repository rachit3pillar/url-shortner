import express from "express";
import { PORT } from "./config";
import mongooseConnect from "./services/mongoose";
import routes from "./routes";

const app = express();
mongooseConnect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
