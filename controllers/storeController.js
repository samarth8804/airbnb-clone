const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.index = (req, res, next) => {
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", { registeredHomes, currentPage: "index" });
  });
};

exports.getHome = (req, res, next) => {
  // console.log(registeredHomes);
  // res.sendFile(path.join(rootDir, "views", "home.html"));
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/homeList", { registeredHomes, currentPage: "home" });
  });
};

exports.bookings = (req, res, next) => {
  res.render("store/bookings", { currentPage: "bookings" });
};

exports.favouriteList = (req, res, next) => {
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.homeId);
    Home.fetchAll().then((registeredHomes) => {
      const favouritesDetails = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
      );

      // console.log(favouritesDetails);

      res.render("store/favouriteList", {
        favourites: favouritesDetails,
        currentPage: "favourites",
      });
    });
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.fetchById(homeId).then((home) => {
    if (!home) {
      res.redirect("/user/homeList");
    } else {
      res.render("store/homeDetail", { currentPage: "detail", home });
    }
  });
};

exports.addFavourite = (req, res, next) => {
  const homeId = req.body.id;
  const favourite = new Favourite(homeId);

  favourite
    .addToFavourite()
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while making favourite : ", err);
    })
    .finally(() => {
      res.redirect("/user/favourites");
    });
};

exports.deleteFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log("Error while deleting favourite : ", err);
    })
    .finally(() => {
      res.redirect("/user/favourites");
    });
};
