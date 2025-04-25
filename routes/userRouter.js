const path = require("path");
const express = require("express");
const router = express.Router();

const rootDir = require("../utils/pathUtils");
const { getHome } = require("../controllers/homes");

router.get("/", getHome);

module.exports = router;
