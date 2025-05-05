const path = require("path");
const express = require("express");
const app = express();
const session = require("express-session");
const MondoDBStore = require("connect-mongodb-session")(session);
const multer = require("multer");
const { default: mongoose } = require("mongoose");
const DB_PATH =
  "mongodb+srv://samarthmittal0808:samarth%40atlas%401@cluster0.a9socrh.mongodb.net/airbnb?retryWrites=true&w=majority&appName=Cluster0";

const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");
const { error404 } = require("./controllers/error");

// ejs setup
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MondoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

const randomString = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const multerOptions = { storage, fileFilter };

app.use(express.urlencoded());
app.use(multer(multerOptions).single("houseImage"));
app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/details/uploads", express.static(path.join(rootDir, "uploads")));
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
