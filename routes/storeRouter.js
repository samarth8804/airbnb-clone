const path = require("path");
const express = require("express");
const router = express.Router();

const rootDir = require("../utils/pathUtils");
const {
  bookings,
  getHome,
  favouriteList,
  index,
  getHomeDetails,
  addFavourite,
  deleteFavourites,
  getHouseRules,
} = require("../controllers/storeController");

router.get("/homeList", getHome);

router.get("/", index);

router.get("/bookings", bookings);

router.get("/favourites", favouriteList);

router.get("/details/:homeId", getHomeDetails);

router.post("/favourites", addFavourite);

router.post("/delete-favourite/:homeId", deleteFavourites);

router.get("/rules/:homeId", getHouseRules);
module.exports = router;
