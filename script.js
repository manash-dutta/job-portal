import express from "express";
import ejsLayouts from "express-ejs-layouts";
import ApplicantController from "./src/controllers/applicants.controller.js";
import RecruiterController from "./src/controllers/recruiter.controller.js";
import JobsController from "./src/controllers/jobs.controller.js";
import { resolve } from "path";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import {
  validateNewRecruiterForm,
  validateNewJobForm,
  validateEditJobForm,
} from "./src/middlewares/validation.middleware.js";
import { setUserLocals } from "./src/middlewares/current-user.middleware.js";

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
app.use(setUserLocals);

// Creating instances of controllers
const jobsController = new JobsController();
const applicantsController = new ApplicantController();
const recruiterController = new RecruiterController();

// GET Routes
app.get("/", jobsController.getHome);
app.get("/jobs", jobsController.getJobs);
app.get("/jobs/:id", jobsController.getJobDetails);
app.get("/new-job", auth, jobsController.getAddNewJob);
app.get("/edit-job/:id", auth, jobsController.getUpdateJob);
app.get("/applicants/:jobId", auth, applicantsController.getApplicantsByJob);
app.get("/register", recruiterController.getRegister);
app.get("/login", recruiterController.getLogin);
app.get("/logout", recruiterController.getLogout);
app.get("/search", jobsController.searchJobs)

// POST Routes
app.post("/add-job", auth, validateNewJobForm, jobsController.postAddNewJob);
app.post("/edit-job", auth, validateEditJobForm, jobsController.postUpdateJob);
app.post("/delete-job/:id", auth, jobsController.postDeleteJob);
app.post(
  "/apply",
  uploadFile.single("resume"),
  applicantsController.postApplyJob
);
app.post("/login", recruiterController.postLogin);
app.post(
  "/register",
  validateNewRecruiterForm,
  recruiterController.postRegister
);

// Setting server to listen to port
app.listen(2200, () => {
  console.log("Server is listening at port 2200");
});
