const path = require("path");
const express = require("express");
const router = express.Router();

const rootDir = require("../utils/pathUtils");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = router;
