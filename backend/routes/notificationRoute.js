const router = require("express").Router();
const { eventController, pushNotificationController } = require("../controller/notification/pushNotification");
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/verifyUserRole");

router.get("/events", eventController);
router.post("/send-notification", verifyToken, checkAdmin, pushNotificationController);

module.exports = router;