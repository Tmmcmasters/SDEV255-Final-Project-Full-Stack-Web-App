const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const { requireAuth } = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.get("/student", studentController.student_info_get);
router.post("/student", studentController.student_info_post);
=======
const studentController = require("../controllers/studentController");

router.get("/:id", studentController.student_index);

router.post("/:id", studentController.student_course_list_update);
router.post("/:id/drop", studentController.student_course_drop);
>>>>>>> main

module.exports = router;
