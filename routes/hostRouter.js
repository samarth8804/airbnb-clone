const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const {
  getAddHome,
  homeAdded,
  getHostHomes,
  getEditHome,
  postEditHome,
  deleteHome
} = require("../controllers/hostController");
const rootDir = require("../utils/pathUtils");

hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home", homeAdded);

hostRouter.get("/host-home-list", getHostHomes);

hostRouter.get("/edit-home/:homeId", getEditHome);

hostRouter.post("/edit-home", postEditHome);

hostRouter.post("/delete-home/:homeId",deleteHome);

exports.hostRouter = hostRouter;
