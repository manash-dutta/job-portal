import JobsModel from "../models/jobs.model.js";

export default class JobsController {
  getHome(req, res) {
    res.render("home");
  }

  getJobs(req, res) {
    let jobs = JobsModel.getJobs();
    res.render("jobs", { jobs: jobs });
  }

  getJobDetails(req, res) {
    const id = req.params.id;
    let jobs = JobsModel.getJobs();
    const jobFound = JobsModel.getJobById(id);
    if (!jobFound) {
      return res.status(404).send("Job Not Found!");
    }
    res.render("job-detail", { job: jobFound });
  }
}
