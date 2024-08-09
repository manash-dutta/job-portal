import JobsModel from "../models/jobs.model.js";

export default class JobsController {
  getHome(req, res) {
    res.render("home");
  }

  getJobs(req, res) {
    let jobs = JobsModel.getJobs();
    res.render("jobs", { jobs: jobs });
  }
}
