const { check, validationResult } = require("express-validator");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { currentPage: "login", isLoggedIn: false });
};

exports.postLogin = (req, res, next) => {
  const username = req.body.username;
  console.log(username);
  // res.cookie("isLoggedIn", true);
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    currentPage: "signup",
    isLoggedIn: false,
    errors: [],
    oldInput: {
      firstname: "",
      lastname: "",
      password: "",
      email: "",
    },
  });
};

exports.postSignup = [
  check("firstname")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Firstname should be atleast 2 characters long")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Firstname should only contain alphabets"),
  check("lastname")
    .matches(/^[A-Za-z\s]*$/)
    .withMessage("Firstname should only contain alphabets"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password should be atleast 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password should contain atleast one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password should contain atleast one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password should contain atleast one number")
    .matches(/[!@#$%^&*()_+={}\[\]:;"'<>,.?~`-]/)
    .withMessage("Password should contain atleast one special character"),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .withMessage("Passwords do not match"),
  check("userType")
    .notEmpty()
    .withMessage("Please select a user type")
    .isIn(["guest", "host"])
    .withMessage("User type must be either guest or host"),
  check("terms")
    .exists()
    .withMessage("You must accept the terms and conditions"),
  (req, res, next) => {
    const { firstname, lastname, email, userType } = req.body;

    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(422).render("auth/signup", {
        currentPage: "signup",
        isLoggedIn: false,
        errors: error.array().map((error) => error.msg),
        oldInput: {
          firstname,
          lastname,
          email,
          userType,
        },
      });
    }
    res.redirect("/login");
  },
];
