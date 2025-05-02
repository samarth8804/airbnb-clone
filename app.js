const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const MondoDBStore = require("connect-mongodb-session")(session);
const DB_PATH =
  "mongodb+srv://samarthmittal0808:samarth%40atlas%401@cluster0.a9socrh.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0";

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");
const { error404 } = require("./controllers/error");
const { default: mongoose } = require("mongoose");

// ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MondoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));
app.use(
  session({
    secret: "Airbnb App",
    resave: false,
    saveUninitialized: true,
    store,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;

  next();
});

app.use(storeRouter);

app.use(
  "/host",
  (req, res, next) => {
    if (!req.session.isLoggedIn) {
      return res.redirect("/login");
    }
    next();
  },
  hostRouter
);

app.use(authRouter);

app.use(error404);

const PORT = 3000;

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected with db");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to mongo : ", err);
  });
