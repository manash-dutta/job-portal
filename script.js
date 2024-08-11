import express from "express";
import ejsLayouts from "express-ejs-layouts";
import session from "express-session";
import cookieParser from "cookie-parser";
import { resolve } from "path";
import JobsController from "./src/controllers/jobs.controller.js";
import ApplicantController from "./src/controllers/applicants.controller.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";

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
app.use(
  session({
    secret: "secretKey@123",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Creating instances of controllers
const jobsController = new JobsController();
const applicantsController = new ApplicantController();


// GET Routes
app.get("/", jobsController.getHome);
app.get("/jobs", jobsController.getJobs);
app.get("/jobs/:id", jobsController.getJobDetails);
app.get("/new-job", jobsController.getAddNewJob);
app.get("/edit-job/:id", jobsController.getUpdateJob);
app.get("/applicants/:jobId", applicantsController.getApplicantsByJob);


// POST Routes
app.post("/add-job", jobsController.postAddNewJob);
app.post("/edit-job", jobsController.postUpdateJob);
app.post("/delete-job/:id", jobsController.postDeleteJob);
app.post(
  "/apply",
  uploadFile.single("resume"),
  applicantsController.postApplyJob
);

// Setting server to listen to port
app.listen(2200, () => {
  console.log("Server is listening at port 2200");
});
