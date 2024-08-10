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

  getAddNewJob(req, res) {
    res.render("add-job");
  }

  getUpdateJob(req, res) {
    const id = req.params.id;
    const jobFound = JobsModel.getJobById(id);
    if (jobFound) {
      res.render("edit-job", { job: jobFound });
    } else {
      res.status(401).send("Job not found");
    }
  }

  postAddNewJob(req, res) {
    const {
      position,
      company,
      description,
      location,
      salary,
      skills,
      applyBy,
      openings,
      category,
    } = req.body;
    JobsModel.addJob(
      position,
      company,
      description,
      location,
      salary,
      skills,
      applyBy,
      openings,
      category
    );
    let jobs = JobsModel.getJobs();
    res.render("jobs", { jobs });
  }

  postUpdateJob(req, res) {
    const {
      id,
      position,
      company,
      description,
      location,
      salary,
      skills,
      applyBy,
      openings,
      category,
    } = req.body;

    JobsModel.updateJob(
      id,
      position,
      company,
      description,
      location,
      salary,
      skills,
      applyBy,
      openings,
      category
    );

    const jobs = JobsModel.getJobs();
    res.render("jobs", { jobs });
  }

  postDeleteJob(req, res) {
    const id = req.params.id;
    let jobs = JobsModel.getJobs();
    const jobFound = JobsModel.getJobById(id);
    if (!jobFound) {
      return res.status(401).send("Product not found");
    }
    JobsModel.deleteJob(id);
    res.render("jobs", { jobs });
  }
}
