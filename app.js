const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const courseRoutes = require("./routes/courseRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const Course = require("./models/course");
const jwt = require("jsonwebtoken");
const {
  requireStudentEmail,
  requireAuth,
  checkUser,
  allowedEmails,
} = require("./middleware/authMiddleware");
const User = require("./models/User");

// express app
const app = express();

// connect to MongoDB
// username: webAppDevGroupFive
// password: webAppDev5!
mongoose.set("strictQuery", false);
const dbURI =
  "mongodb+srv://webAppDevGroupFive:webAppDev5!@clusterfive.qyzwllp.mongodb.net/node-auth";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(express.json()); // for accepting json data
app.use(cookieParser()); // for accepting cookies

// routes
app.get("*", checkUser);

app.get("/", (req, res) => {
  res.redirect("/index");
});

app.get("/index", (req, res) => {
  res.render("index", { title: "Home" });
});
// Teach routes
// in your server-side code
app.get("/teachers", (req, res) => {
  // find all users with email addresses in the allowedEmails array
  User.find({ email: { $in: allowedEmails } }).then((teachers) => {
    // render the EJS template and pass in the list of teachers
    res.render("teachers", { title: "Teachers", teachers });
  });
});
// Create a logiIn Route

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

// Create an unauthorized route
app.get("/unauthorized", (req, res) => {
  res.render("unauthorized", { title: "Unauthorized" });
});

// course routes
app.use("/courses", courseRoutes);

//student routes
app.use("/student", requireStudentEmail, studentRoutes);

// auth routes
app.use(authRoutes);

// 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
