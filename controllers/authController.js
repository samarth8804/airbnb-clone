const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    currentPage: "login",
    isLoggedIn: false,
    errors: [],
    oldInput: { email: "" },
    user: req.session.user,
  });
};

exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Inavlid email or password"],
      oldInput: { email },
      user: req.session.user,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(422).render("auth/login", {
      currentPage: "login",
      isLoggedIn: false,
      errors: ["Inavlid email or password"],
      oldInput: { email },
      user: req.session.user,
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
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
      user: req.session.user,
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
    const { firstname, lastname, email, userType, password } = req.body;

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
        user: req.session.user,
      });
    }

    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        const user = new User({
          firstname,
          lastname,
          email,
          password: hashedPassword,
          userType,
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(422).render("auth/signup", {
          currentPage: "signup",
          isLoggedIn: false,
          errors: [err.message],
          oldInput: {
            firstname,
            lastname,
            email,
            userType,
          },
          user: req.session.user,
        });
      });
  },
];
