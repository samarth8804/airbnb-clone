// const registeredHomes = [];

const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "addHome.html"));
  res.render("host/addHome", { currentPage: "addHome" });
};

exports.homeAdded = (req, res, next) => {
  console.log("Home registration successfull for ", req.body.houseName);
  const { houseName, price, location, houseImage, rating } = req.body;

  const home = new Home(houseName, houseImage, rating, price, location);

  home.save();

  // registeredHomes.push({ houseName, houseImage, rating, location, price });
  // res.sendFile(path.join(rootDir, "views", "homeAdded.html"));
  res.render("host/homeAdded", { currentPage: "homeAdded" });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) => {
    res.render("host/hostHomeList", {
      registeredHomes,
      currentPage: "hostHomes",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.fetchById(homeId, (home) => {
    if (!home) {
      console.log("Home not found for editing.");
      return res.redirect("/host/host-home-list");
    }

    console.log(homeId, editing, home);
    res.render("host/editHome", {
      currentPage: "editHome",
      editing: editing,
      home: home,
    });
  });
};

exports.postEditHome = (req, res, next) => {
  console.log("Home edit successfull for ", req.body.houseName);
  const { id, houseName, price, location, houseImage, rating } = req.body;

  const home = new Home(houseName, houseImage, rating, price, location);
  home.id = id;

  home.save();

  res.redirect("/host/host-home-list");
};

exports.deleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home deleted successfully ", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while deleting", error);
    }

    res.redirect("/host/host-home-list");
  });
};
