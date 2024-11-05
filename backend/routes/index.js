const router = require("express").Router();
const userRoute = require("./userRoute");
const blogRoute = require("./blogRoute");
const dashboardRoute = require("./dashboardRoute");
const commentRoute = require("./commentRoute");
const logRoute = require("./logRoute");
const categoryRoute = require("./categoryRoute");
const notificationRoute = require("./notificationRoute");
const translationRoute = require("./translationRoute");
const tourStepsRoute = require("./tourStepsRoute");

router.use(userRoute);
router.use(blogRoute);
router.use(dashboardRoute);
router.use(commentRoute);
router.use(logRoute);
router.use(categoryRoute);
router.use(notificationRoute);
router.use(translationRoute);
router.use(tourStepsRoute);

module.exports = router;