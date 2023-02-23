const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.get("/", courseController.course_index);

router.post("/", courseController.course_create_post);
router.get("/create", courseController.course_create_get);

// handle individual course entries
router.get("/:id/update", courseController.course_update_get);
router.post("/:id", courseController.course_update_post);

router.get("/:id", courseController.course_details);

router.delete("/:id", courseController.course_delete);

module.exports = router;
