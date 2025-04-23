const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send(`<h1>Welcome to airbnb</h1>
    <a href="/add-home">Add home</a>`);
});

module.exports = router;
