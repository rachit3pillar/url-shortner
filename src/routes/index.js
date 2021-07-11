import express from "express";
import {
  renderHomePage,
  handleTinyUrl,
  handleRedirect,
  handleAnalytics,
} from "../controllers/controllers";

const routes = express.Router({ strict: true });

routes.get("/", renderHomePage);
routes.get("/analytics", handleAnalytics);
routes.get("/:route", handleRedirect);
routes.post("/create-link", handleTinyUrl);

export default routes;
