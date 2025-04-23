const express = require("express");
const app = express();

const userRouter = require("./routes/userRouter");
const hostRouter = require("./routes/hostRouter");

app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.use("/user", userRouter);

app.get("/add-home", (req, res, next) => {
  res.send(`
    <h1> Register your home here : </h1>
    <form action="/add-home" method="POST">
    <input type="text" name="houseName" placeholder="Enter your house name here"/>
    <button type="submit">Submit</button>
    </form> `);
});

app.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.send(`<h1>Home registered successfully</h1>
    <a href="/">Go home</a>`);
});

app.listen(3000);
