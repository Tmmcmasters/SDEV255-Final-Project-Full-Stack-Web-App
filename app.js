const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Course = require("./models/course");

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
    app.listen(3000);
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

app.get("/teachers", (req, res) => {
  res.render("teachers", { title: "Teachers" });
});

// course routes
app.get("/courses", (req, res) => {
  Course.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Courses", courses: result });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/courses", (req, res) => {
  console.log(req.body);
  const course = new Course(req.body);
  course
    .save()
    .then((result) => {
      res.redirect("/courses");
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/courses/create", (req, res) => {
  res.render("create", { title: "create" });
});

// handle individual course entries
// I have having trouble with this one. When the code runs, it spits out, "Cast to ObjectId failed for value "sdfg" (type string) at path "_id" for model "Course""
app.get("/courses/:id", (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { title: "404" });
  }
  Course.findById(id)
    .then((result) => {
      if (!result) {
        return res.status(404).render("404", { title: "404" });
      }
      res.render("details", { course: result, title: "Course Details" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Internal server error");
    });
});
//I am also having trouble with this one. It is throwing the error "TypeError: Cannot read properties of undefined (reading 'redirect')at 63f21e937cc4528a7c796f13:95:41" but it still deletes it from the Database.
app.delete("/courses/:id", (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((error) => {
      console.log(error);
    });
});
// 404 page
//This won't display because of the above errors
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
