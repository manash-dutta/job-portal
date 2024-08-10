import express from "express";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import { resolve } from "path";
import JobsController from "./src/controllers/jobs.controller.js";

// Create express server
const app = express();

// Set up view engine settings
app.set("view engine", "ejs");
app.set("views", resolve("src", "views"));

// Configure Middlewares
app.use(express.static("src/views"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(ejsLayouts);

// Creating instances of controllers
const jobsController = new JobsController();

// GET Routes
app.get("/", jobsController.getHome);
app.get("/jobs", jobsController.getJobs);
app.get("/jobs/:id", jobsController.getJobDetails);

// POST Routes

// Setting server to listen to port
app.listen(2200, () => {
  console.log("Server is listening at port 2200");
});
