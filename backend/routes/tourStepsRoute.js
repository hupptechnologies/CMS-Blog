const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/verifyUserRole");
const createTourContentController = require("../controller/tourSteps/addTourContent");
const fetchTourStepsController = require("../controller/tourSteps/getTourSteps");

router.post("/tourStep", verifyToken, checkAdmin, createTourContentController);
router.get("/tourStep", verifyToken, checkAdmin, fetchTourStepsController);

module.exports = router;