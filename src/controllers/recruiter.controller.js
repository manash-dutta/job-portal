import RecruiterModel from "../models/recruiter.model.js";
import JobsModel from "../models/jobs.model.js";

export default class RecruiterController {
  getRegister(req, res) {
    res.render("register");
  }

  getLogin(req, res) {
    res.render("login", { error: null });
  }

  getLogout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  }

  postRegister(req, res) {
    const { name, email, password } = req.body;
    RecruiterModel.add(name, email, password);
    res.render("login", { error: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const existingRecruiter = RecruiterModel.isExistingRecruiter(
      email,
      password
    );
    console.log("Existing recruiter", existingRecruiter);
    if (!existingRecruiter) {
      return res.render("login", { error: "Invalid Credentials" });
    }
    req.session.userEmail = email;
    let jobs = JobsModel.getJobs();
    res.render("jobs", { jobs, userEmail: req.session.userEmail });
  }
}
