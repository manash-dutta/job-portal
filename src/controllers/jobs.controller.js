import JobsModel from "../models/jobs.model.js";

export default class JobsController {
  getHome(req, res) {
    res.render("home", { userEmail: req.session.userEmail });
  }

  getJobs(req, res) {
    let jobs = JobsModel.getJobs();
    res.render("jobs", { jobs: jobs, userEmail: req.session.userEmail });
  }

  getJobDetails(req, res) {
    const id = req.params.id;
    let jobs = JobsModel.getJobs();
    const jobFound = JobsModel.getJobById(id);
    if (!jobFound) {
      return res.status(404).send("Job Not Found!");
    }
    res.render("job-detail", {
      job: jobFound,
      errors: null,
      userEmail: req.session.userEmail,
    });
  }

  getAddNewJob(req, res) {
    res.render("add-job", { errors: null, userEmail: req.session.userEmail });
  }

  getUpdateJob(req, res) {
    const id = req.params.id;
    const jobFound = JobsModel.getJobById(id);
    if (jobFound) {
      res.render("edit-job", {
        job: jobFound,
        errors: null,
        userEmail: req.session.userEmail,
      });
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
    const skillsArray = Array.isArray(skills)
      ? skills
      : skills.split(",").map((skill) => skill.trim());
    JobsModel.addJob(
      position,
      company,
      description,
      location,
      salary,
      skillsArray,
      applyBy,
      openings,
      category
    );
    let jobs = JobsModel.getJobs();
    res.render("jobs", { jobs, userEmail: req.session.userEmail });
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

  searchJobs(req, res) {
    const { query } = req.query;
    const jobs = JobsModel.jobSearchResult(query);
    res.render("search-job", { jobs, query });
  };
}
