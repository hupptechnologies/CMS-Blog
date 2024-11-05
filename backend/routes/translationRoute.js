const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/verifyUserRole");
const createTranslationController = require("../controller/translations/createTranslation");
const fetchTranslationsController = require("../controller/translations/getTranslation");

router.post("/translate", verifyToken, checkAdmin, createTranslationController);
router.get("/translate", fetchTranslationsController);

module.exports = router;