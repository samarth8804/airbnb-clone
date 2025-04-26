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
} = require("../controllers/storeController");

router.get("/homeList", getHome);

router.get("/", index);

router.get("/bookings", bookings);

router.get("/favourites", favouriteList);

router.get("/details/:homeId", getHomeDetails);

router.post("/favourites", addFavourite);
module.exports = router;
