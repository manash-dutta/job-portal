export default class ApplicantModel {
  constructor(id, name, email, mobile, resume, jobId) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.resume = resume;
    this.jobId = jobId;
  }

  static getApplicants() {
    return applicants;
  }

  static getApplicantsByJob(jobId) {
    return applicants.filter(applicant => {
      return applicant.jobId === Number(jobId)
    });
  }

  static add(name, email, mobile, resume, jobId) {
    let newApplicant = new ApplicantModel(
      applicants.length + 1,
      name,
      email,
      mobile,
      resume,
      Number(jobId)
    );
    applicants.push(newApplicant);
  }
}

let applicants = [];
