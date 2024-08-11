export default class JobsModel {
  constructor(
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
  ) {
    this.id = id;
    this.position = position;
    this.company = company;
    this.description = description;
    this.location = location;
    this.salary = salary;
    this.skills = skills;
    this.applyBy = applyBy;
    this.openings = openings;
    this.category = category;
    this.applicants = 0;
  }

  static getJobs() {
    return jobs;
  }

  static getJobById(id) {
    return jobs.find((job) => job.id === Number(id));
  }

  static addJob(
    position,
    company,
    description,
    location,
    salary,
    skills,
    applyBy,
    openings,
    category
  ) {
    let newJob = new JobsModel(
      jobs.length + 1,
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
    jobs.push(newJob);
  }

  static updateJob(
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
  ) {
    const index = jobs.findIndex((job) => job.id === Number(id));
    jobs[index] = {
      ...jobs[index],
      position,
      company,
      description,
      location,
      salary,
      skills,
      applyBy,
      openings,
      category,
    };
  }

  static deleteJob(id) {
    const index = jobs.findIndex((job) => job.id === Number(id));
    jobs.splice(index, 1);
  }

  static incrementApplicantCount(id) {
    const job = this.getJobById(id);
    if (job) {
      job.applicants += 1;
    }
  }
}


let jobs = [
  new JobsModel(
    1,
    "SDE-1",
    "Microsoft",
    "We are seeking a motivated and enthusiastic Software Development Engineer 1 (SDE-1) to join our engineering team. As an SDE-1, you will be responsible for designing, developing, and maintaining software applications. You will work closely with senior engineers and cross-functional teams to deliver high-quality solutions that meet business needs.",
    "Bangalore",
    15000,
    ["Java", "AWS", "Springboot", "JS", "React", "MongoDB", "Data Structures"],
    "30 Sep 2024",
    2,
    "Tech"
  ),
  new JobsModel(
    2,
    "Web Development Intern",
    "HoneymoonIQ",
    "We are looking for a passionate and creative Web Development Intern to join our team. As a Web Development Intern, you will work closely with our development team to support various web projects and gain hands-on experience in designing and implementing web solutions. You will have the opportunity to contribute to the development of websites and web applications, learn about industry best practices, and enhance your skills in a collaborative and dynamic environment.",
    "Remote",
    5000,
    ["HTML", "CSS", "JS", "React", "MongoDB", "Data Structures", "AWS"],
    "31 Aug 2024",
    7,
    "Tech"
  ),
  new JobsModel(
    3,
    "Data Analyst",
    "Ancient",
    "We are seeking a detail-oriented and analytical Data Analyst to join our team. In this role, you will analyze complex datasets to derive actionable insights, support data-driven decision-making, and contribute to business strategy. You will work with various data sources, employ statistical techniques, and create reports and visualizations to communicate findings effectively. This position offers an excellent opportunity to develop your analytical skills and make a meaningful impact on our organization’s operations and growth.",
    "Kolkata",
    12000,
    ["Java", "AWS", "Springboot", "JS", "React", "MongoDB", "Data Structures"],
    "30 Aug 2024",
    3,
    "Tech"
  ),
];
