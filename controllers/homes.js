// const registeredHomes = [];

const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "addHome.html"));
  res.render("addHome", { currentPage: "addHome" });
};

exports.homeAdded = (req, res, next) => {
  console.log("Home registration successfull for ", req.body.houseName);
  const { houseName, price, location, houseImage, rating } = req.body;

  const home = new Home(houseName, houseImage, rating, price, location);

  home.save();

  // registeredHomes.push({ houseName, houseImage, rating, location, price });
  // res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
  res.render("homeAdded", { currentPage: "homeAdded" });
};

exports.getHome = (req, res, next) => {
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  const registeredHomes = Home.fetchAll((registeredHomes) => {
    res.render("home", { registeredHomes, currentPage: "home" });
  });
};
