const router = require("express").Router();
const checkAdmin = require("../middlewares/verifyUserRole");
const verifyToken = require("../middlewares/verifyToken");
const deleteActivityById = require("../controller/activities/deleteSingleActivity");
const { getUserStatisticsController } = require("../controller/users/loginUser");
const { fetchAllUsersController } = require("../controller/users/getAllUsers");
const { fetchAllActivitiesController, countActivityTypesController } = require("../controller/dashboard/logActivity");

router.get("/users", verifyToken, checkAdmin, fetchAllUsersController);
router.get("/user/statistic", verifyToken, checkAdmin, getUserStatisticsController);
router.post("/user/activity", verifyToken, checkAdmin, fetchAllActivitiesController);
router.get("/user/activityTypes", verifyToken, checkAdmin, countActivityTypesController);
router.delete("/user/activity", verifyToken, checkAdmin, deleteActivityById);

module.exports = router;