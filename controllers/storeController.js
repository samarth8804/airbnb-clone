const session = require("express-session");
const Favourite = require("../models/favourite");
const Home = require("../models/home");
const User = require("../models/user");

exports.index = (req, res, next) => {
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  console.log(req.session, req.isLoggedIn);
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes,
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHome = (req, res, next) => {
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  Home.find().then((registeredHomes) => {
    res.render("store/homeList", {
      registeredHomes,
      currentPage: "home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.bookings = (req, res, next) => {
  res.render("store/bookings", {
    currentPage: "bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.favouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");

  res.render("store/favouriteList", {
    favourites: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "favourites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/homeList");
    } else {
      res.render("store/homeDetail", {
        currentPage: "detail",
        home,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.addFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.deleteFavourites = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }
  res.redirect("/favourites");
};
