const mongoose = require("mongoose");
const Course = require("../models/course");

// course_index, course_details, course_create_get, course_create_post, course_delete

const course_index = (req, res) => {
  Course.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("courses/index", { title: "All courses", courses: result });
    })
    .catch((error) => {
      res.status(404).render("404", { title: "course not found" });
    });
};

const course_search = (req, res) => {
  const courseName = req.query.courseName;
  if (courseName) {
    Course.find({})
      .or([{ title: courseName }, { subject: courseName }])
      .then((result) => {
        res.render("courses/index", {
          title: "Found courses",
          courses: result,
        });
      })
      .catch((error) => {
        res.status(404).render("404", { title: "course not found" });
      });
  } else {
    Course.find()
      .sort({ createdAt: -1 })
      .then((result) => {
        res.render("courses/index", { title: "All courses", courses: result });
      })
      .catch((error) => {
        res.status(404).render("404", { title: "course not found" });
      });
  }
};

const course_details = (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { title: "404" });
  }
  Course.findById(id)
    .then((result) => {
      res.render("courses/details", {
        course: result,
        title: "course Details",
      });
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

const course_create_get = (req, res) => {
  res.render("courses/create", { title: "Create" });
};

const course_create_post = (req, res) => {
  const course = new Course(req.body);
  course
    .save()
    .then((result) => {
      res.redirect("/courses");
    })
    .catch((error) => {
      res.status(404).render("404", { title: "course not found" });
    });
};

const course_update_get = (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).render("404", { title: "404" });
  }
  Course.findById(id)
    .then((result) => {
      res.render("courses/update", { course: result, title: "course Update" });
    })
    .catch((error) => {
      res.status(500).send("Internal server error");
    });
};

const course_update_post = (req, res) => {
  console.log(req.body);
  Course.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject,
      credits: req.body.credits,
    }
  )
    .then((result) => {
      res.redirect("/courses");
    })
    .catch((error) => {
      res.status(404).render("404", { title: "course not found" });
    });
};

const course_delete = (req, res) => {
  const id = req.params.id;
  Course.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/courses" });
    })
    .catch((error) => {
      res.status(404).render("404", { title: "course not found" });
    });
};

module.exports = {
  course_index,
  course_search,
  course_details,
  course_create_get,
  course_create_post,
  course_update_get,
  course_update_post,
  course_delete,
};
