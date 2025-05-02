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
