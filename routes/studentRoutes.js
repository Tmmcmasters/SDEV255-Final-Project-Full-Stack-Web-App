const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const studentController = require("../controllers/studentController");

router.get("/student", studentController.student_info_get);
router.post("/student", studentController.student_info_post);

module.exports = router;
