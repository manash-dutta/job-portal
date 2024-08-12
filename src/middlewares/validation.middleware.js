import { body, validationResult } from "express-validator";

// Recruiter registration form validation Function
export const validateNewRecruiterForm = async (req, res, next) => {
  const rules = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter valid Email"),
    body("password").notEmpty().withMessage("Password is required"),
  ];
  await Promise.all(rules.map((rule) => rule.run(req)));
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    res.render("register", { errors: validationErrors.array() });
  } else {
    next();
  }
};

// Add New Job form validation function
export const validateNewJobForm = async (req, res, next) => {
  const rules = [
    body("category").notEmpty().withMessage("Job category is required"),
    body("position").notEmpty().withMessage("Job designation is required"),
    body("location").notEmpty().withMessage("Job location is required"),
    body("company").notEmpty().withMessage("Company name is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
    body("openings")
      .isInt({ gt: 0 })
      .withMessage("Total positions must be a positive integer"),
    body("description").notEmpty().withMessage("Job description is required"),
    body("applyBy").isDate().withMessage("Apply by date must be a valid date"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("add-job", { errors: errors.array() });
  }

  next();
};

// Edit Job form validation function
export const validateEditJobForm = async (req, res, next) => {
  const rules = [
    body("category").notEmpty().withMessage("Job category is required"),
    body("position").notEmpty().withMessage("Job designation is required"),
    body("location").notEmpty().withMessage("Job location is required"),
    body("company").notEmpty().withMessage("Company name is required"),
    body("salary").notEmpty().withMessage("Salary is required"),
    body("openings")
      .isInt({ gt: 0 })
      .withMessage("Total positions must be a positive integer"),
    body("description").notEmpty().withMessage("Job description is required"),
    body("applyBy").isDate().withMessage("Apply by date must be a valid date"),
  ];

  await Promise.all(rules.map((rule) => rule.run(req)));
  const errors = validationResult(req);

  const job = req.body;

  if (!errors.isEmpty()) {
    return res.render("edit-job", { errors: errors.array(), job });
  }

  next();
};
