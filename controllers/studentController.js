//#region IMPORTS
const User = require("../models/User");

//#endregion END IMPORTS

//#region SIGNUP CONTROLLERS
module.exports.student_info_get = (req, res) => {
  res.render("student", { title: "Student Info" });
};

module.exports.student_info_post = (req, res) => {
  console.log(res, req);
};
/* const addClass = document.querySelector(".addClass");
addClass.addEventListener("click", (e) => {
  console.log("button pushed");
  if (user.classes.includes(course.title)) {
    console.log("Course already added");
  } else {
    console.log(user, user.classes);
    user.classes.push(course.title);
    console.log(user.classes);
  }
}); */
//#endregion END SIGNUP CONTROLLERS
