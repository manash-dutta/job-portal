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
    category,
    postedAt
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
    this.postedAt = postedAt;
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
      category,
      new Date().toLocaleDateString()
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

  static jobSearchResult(query) {
    const normalizedQuery = query.trim().toLowerCase();

    const data = jobs.filter((job) => {
      return (
        job.company.trim().toLowerCase().includes(normalizedQuery) ||
        job.location.trim().toLowerCase().includes(normalizedQuery) ||
        job.position.trim().toLowerCase().includes(normalizedQuery)
      );
    });

    return data;
  }
}

let jobs = [
  new JobsModel(
    1,
    "SDE",
    "Microsoft",
    "We are seeking a motivated and enthusiastic Software Development Engineer 1 (SDE-1) to join our engineering team. As an SDE-1, you will be responsible for designing, developing, and maintaining software applications. You will work closely with senior engineers and cross-functional teams to deliver high-quality solutions that meet business needs.",
    "Bangalore",
    35000,
    ["Java", "AWS", "Springboot", "JS", "React", "MongoDB", "Data Structures"],
    "2024-09-30",
    2,
    "Tech",
    "5/12/2024"
  ),
  new JobsModel(
    2,
    "MERN Developer",
    "HoneymoonIQ",
    "We are looking for a passionate and creative Web Developer to join our team. As a Web Development Intern, you will work closely with our development team to support various web projects and gain hands-on experience in designing and implementing web solutions. You will have the opportunity to contribute to the development of websites and web applications, learn about industry best practices, and enhance your skills in a collaborative and dynamic environment.",
    "Remote",
    20000,
    ["HTML", "CSS", "JS", "React", "MongoDB", "Data Structures", "AWS"],
    "2024-08-31",
    7,
    "Tech",
    "7/31/2024"
  ),
  new JobsModel(
    3,
    "Data Analyst",
    "Ancient",
    "We are seeking a detail-oriented and analytical Data Analyst to join our team. In this role, you will analyze complex datasets to derive actionable insights, support data-driven decision-making, and contribute to business strategy. You will work with various data sources, employ statistical techniques, and create reports and visualizations to communicate findings effectively. This position offers an excellent opportunity to develop your analytical skills and make a meaningful impact on our organization’s operations and growth.",
    "Kolkata",
    12000,
    ["Java", "AWS", "Springboot", "JS", "React", "MongoDB", "Data Structures"],
    "2024-08-31",
    3,
    "Tech",
    "8/1/2024"
  ),
];
