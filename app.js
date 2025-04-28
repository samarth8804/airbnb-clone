const path = require("path");
const express = require("express");
const app = express();

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const { error404 } = require("./controllers/error");
const mongoConnect = require("./utils/databaseUtil");

// ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use("/user", storeRouter);

app.use("/host", hostRouter);

app.use(error404);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
