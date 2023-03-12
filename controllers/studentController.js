const User = require("../models/User");
const Course = require("../models/course");

const student_index = (req, res) => {
  const id = req.params.id;
  let user = User.findById(id).then((result) => {
    Course.find({ title: { $in: result.classes } })
      .then((result) => {
        res.render("student", {
          title: "Student Info",
          courses: result,
        });
      })
      .catch((err) => {
        console.log("error");
      });
  });
};

const student_course_list_update = async (req, res) => {
  const id = req.params.id;
  const className = req.body.classes;
  const classList = [];
  await User.findById(id).then((result) => {
    for (let i = 0; i < result.classes.length; i++) {
      classList.push(result.classes[i]);
    }
  });
  const inList = await User.findById(id).then((result) => {
    if (result.classes.includes(className)) {
      return true;
    } else {
      return false;
    }
  });

  if (!inList) {
    classList.push(className);
    User.findOneAndUpdate({ _id: id }, { classes: classList })
      .then((result) => {
        res.redirect("/student/" + id);
      })
      .catch((error) => {
        res.status(404).render("404", { title: "course not found" });
      });
  } else {
    res.redirect("/student/" + id);
  }
};

const student_course_drop = async (req, res) => {
  const id = req.params.id;
  const className = req.body.dropclasses;
  const classList = [];
  await User.findById(id).then((result) => {
    for (let i = 0; i < result.classes.length; i++) {
      classList.push(result.classes[i]);
    }
  });
  if (classList.includes(className)) {
    let index = classList.indexOf(className);
    classList.splice(index, 1);
    await User.findOneAndUpdate({ _id: id }, { classes: classList })
      .then((result) => {
        res.redirect("/student/" + id);
      })
      .catch((error) => {
        res.status(404).render("404", { title: "course not found" });
      });
  }
};

module.exports = {
  student_index,
  student_course_list_update,
  student_course_drop,
};
