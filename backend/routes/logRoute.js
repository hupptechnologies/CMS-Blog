const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/verifyUserRole");
const deleteAllLogController = require("../controller/logs/deleteAllLog");
const fetchAllLogsController = require("../controller/logs/fetchLogs");

router.get("/logs", verifyToken, checkAdmin, fetchAllLogsController);
router.delete("/logs", verifyToken, checkAdmin, deleteAllLogController);

module.exports = router;