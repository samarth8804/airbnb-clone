const path = require("path");
const express = require("express");
const app = express();

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const { error404 } = require("./controllers/error");
const { default: mongoose } = require("mongoose");

// ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use("/user", storeRouter);

app.use("/host", hostRouter);

app.use(error404);

const PORT = 3000;

mongoose
  .connect(
    "mongodb+srv://samarthmittal0808:samarth%40atlas%401@cluster0.a9socrh.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected with db");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to mongo : ", err);
  });
