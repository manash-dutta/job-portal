import RecruiterModel from "../models/recruiter.model.js";
import JobsModel from "../models/jobs.model.js";

export default class RecruiterController {
  getRegister(req, res) {
    res.render("register", {errors: null});
  }

  getLogin(req, res) {
    res.render("login", { errors: null });
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
    res.render("login", { errors: null });
  }

  postLogin(req, res) {
    const { email, password } = req.body;
    const existingRecruiter = RecruiterModel.isExistingRecruiter(
      email,
      password
    );
    if (!existingRecruiter) {
      return res.render("login", { errors: "Invalid Credentials" });
    }
    req.session.userEmail = email;
    req.session.userName = existingRecruiter.name;
    let jobs = JobsModel.getJobs();
    res.render("jobs", {
      jobs,
      userEmail: req.session.userEmail,
      userName: req.session.userName,
    });
  }
}
