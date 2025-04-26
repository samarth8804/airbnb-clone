const path = require("path");
const express = require("express");
const app = express();

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const { error404 } = require("./controllers/error");

// ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use("/user", storeRouter);

app.use("/host", hostRouter);

app.use(error404);

app.listen(3000);
