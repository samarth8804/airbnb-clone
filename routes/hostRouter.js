const path = require("path");
const express = require("express");
const hostRouter = express.Router();

const { getAddHome, homeAdded } = require("../controllers/homes");
const rootDir = require("../utils/pathUtils");


hostRouter.get("/add-home", getAddHome);

hostRouter.post("/add-home", homeAdded);

exports.hostRouter = hostRouter;
