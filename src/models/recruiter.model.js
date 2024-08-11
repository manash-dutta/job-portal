export default class RecruiterModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static add(name, email, password) {
    const newRecruiter = new RecruiterModel(
      recruiters.length + 1,
      name,
      email,
      password
    );
    recruiters.push(newRecruiter);
  }

  static isExistingRecruiter(email, password) {
    return recruiters.find(
      (recruiter) =>
        recruiter.email === email && recruiter.password === password
    );
  }
}

let recruiters = [];
