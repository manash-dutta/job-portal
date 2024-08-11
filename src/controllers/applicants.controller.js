import ApplicantModel from "../models/applicants.model.js";
import JobsModel from "../models/jobs.model.js";

export default class ApplicantController {
  getApplicantsByJob(req, res) {
    const jobId = Number(req.params.jobId);
    const applicants = ApplicantModel.getApplicantsByJob(jobId);
    res.render("job-applications", { applicants, jobId });
  }

  postApplyJob(req, res) {
    const { name, email, mobile, jobId } = req.body;
    const resume = "resumes/" + req.file.filename;
    ApplicantModel.add(name, email, mobile, resume, jobId);
    JobsModel.incrementApplicantCount(jobId);
    const job = JobsModel.getJobById(Number(jobId));
    if (job) {
      res.render("job-detail", { job });
    } else {
      res.status(404).send("Job not found");
    }
  }
}
