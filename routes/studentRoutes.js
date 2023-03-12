const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/:id", studentController.student_index);

router.post("/:id", studentController.student_course_list_update);
router.post("/:id/drop", studentController.student_course_drop);

module.exports = router;
