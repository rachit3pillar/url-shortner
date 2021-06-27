import express from "express";
import {
  renderHomePage,
  handleTinyUrl,
  handleRedirect,
  handleAnalytics,
} from "../controllers/controllers";

// const routes = (app) => {
//   var urlsData = require("../controllers/controllers");
//   app.route("/analytics").get(urlsData.analytics);
// };
// export default routes;

const routes = express.Router({ strict: true });

routes.get("/", renderHomePage);
routes.get("/analytics", handleAnalytics);
routes.get("/:route", handleRedirect);
routes.post("/", handleTinyUrl);


export default routes;
