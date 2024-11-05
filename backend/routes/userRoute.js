const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/verifyUserRole");
const deleteUserController = require("../controller/users/deActivateUser");
const deActivateWelcomeMessageUserController = require("../controller/users/updateWelcomeUser");
const { createUserController } = require("../controller/users/createUser");
const { loginUserController, logoutUserController } = require("../controller/users/loginUser");
const { fetchUserProfileController, updateUserProfileController } = require("../controller/users/profileUser");
const { updateUserAccessController } = require("../controller/users/createUserAccess");
const { getAllAdminsUserController } = require("../controller/users/getAllAdminUser");

router.post("/signup", createUserController);
router.post("/login", loginUserController);
router.get("/profile", verifyToken, fetchUserProfileController);
router.post("/user/logout", verifyToken, logoutUserController);
router.put("/profile", verifyToken, updateUserProfileController);
router.delete("/user", verifyToken, checkAdmin, deleteUserController);
router.put("/user/welcome", verifyToken, checkAdmin, deActivateWelcomeMessageUserController);
router.put("/userAccess", verifyToken, checkAdmin, updateUserAccessController);
router.get("/admins", verifyToken, checkAdmin, getAllAdminsUserController);

module.exports = router;
