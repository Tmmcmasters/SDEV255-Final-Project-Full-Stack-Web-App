const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/authMiddleware");
const courseController = require("../controllers/courseController");
const User = require("../models/User");
const { requireAllowedEmail } = require("../middleware/authMiddleware");


router.get("/", courseController.course_index);

router.post("/", courseController.course_create_post);

// Requires Authorization to Access Course Creation
router.get("/create", requireAllowedEmail, courseController.course_create_get);


// handle individual course entries
router.get("/:id/update", courseController.course_update_get);
router.post("/:id", courseController.course_update_post);

router.get("/:id", courseController.course_details);

router.delete("/:id", courseController.course_delete);

module.exports = router;