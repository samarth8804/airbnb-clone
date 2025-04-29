// const registeredHomes = [];

const Home = require("../models/home");
const Favourite = require("../models/favourite");

exports.getAddHome = (req, res, next) => {
  // res.sendFile(path.join(rootDir, "views", "addHome.html"));
  res.render("host/addHome", { currentPage: "addHome" });
};

exports.homeAdded = (req, res, next) => {
  const { houseName, price, location, houseImage, rating, description } =
    req.body;

  const home = new Home(
    houseName,
    houseImage,
    rating,
    price,
    location,
    description
  );

  home.save().then((result) => {
    console.log("Home saved successfully ", result);
  });

  res.render("host/homeAdded", { currentPage: "homeAdded" });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/hostHomeList", {
      registeredHomes,
      currentPage: "hostHomes",
    });
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.fetchById(homeId).then((home) => {
    
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
  const { id, houseName, price, location, houseImage, rating, description } =
    req.body;

  const home = new Home(
    houseName,
    houseImage,
    rating,
    price,
    location,
    description,
    id
  );

  home.save();

  res.redirect("/host/host-home-list");
};

exports.deleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("Home deleted successfully ", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
    });
};
