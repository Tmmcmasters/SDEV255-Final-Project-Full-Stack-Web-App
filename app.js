const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const courseRoutes = require("./routes/courseRoutes");
// express app
const app = express();

// connect to MongoDB
// username: group5
// password: #6b.#y3MzApsPvU
mongoose.set("strictQuery", false);
const dbURI =
  "mongodb+srv://group5:group5password@cluster0.9j8r4ed.mongodb.net/Group_5_Final_Project_DB?retryWrites=true&w=majority";
mongoose
  .connect(dbURI /* , { useNewUrlParser: true, useUnifiedTopology: true } */)
  .then((result) => {
    console.log("connected to MongoDB");
    // listen for requests
    app.listen(8080);
  })
  .catch((error) => {
    console.log(error);
  });

// register view engine
app.set("view engine", "ejs");
// if not in the views folder
// app.set('views', 'nameoffolder');

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // for accepting form data
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/courses");
});

// TEach routes
app.get("/teachers", (req, res) => {
  res.render("teachers", { title: "Teachers" });
});

// course routes
app.use("/courses", courseRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
