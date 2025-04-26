const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.index = (req, res, next) => {
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  Home.fetchAll((registeredHomes) => {
    res.render("store/index", { registeredHomes, currentPage: "index" });
  });
};

exports.getHome = (req, res, next) => {
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  Home.fetchAll((registeredHomes) => {
    res.render("store/homeList", { registeredHomes, currentPage: "home" });
  });
};

exports.bookings = (req, res, next) => {
  res.render("store/bookings", { currentPage: "bookings" });
};

exports.favouriteList = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favouritesDetails = favourites.map((homeId) =>
        registeredHomes.find((home) => home.id === homeId)
      );
      res.render("store/favouriteList", {
        favourites: favouritesDetails,
        currentPage: "favourites",
      });
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.fetchById(homeId, (home) => {
    if (!home) {
      res.redirect("/user/homeList");
    } else {
      res.render("store/homeDetail", { currentPage: "detail", home });
    }
  });
};

exports.addFavourite = (req, res, next) => {
  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourite : ", error);
    }

    res.redirect("/user/favourites");
  });
};
