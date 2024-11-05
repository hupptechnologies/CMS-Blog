const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/verifyUserRole");
const createCategoryController = require("../controller/categories/AddCategory");
const fetchAllCategoriesController = require("../controller/categories/getCategories");
const deleteCategoryController = require("../controller/categories/deleteCategory");

router.post("/categories", verifyToken, checkAdmin, createCategoryController);
router.post("/get-categories", verifyToken, fetchAllCategoriesController);
router.delete("/categories", verifyToken, checkAdmin, deleteCategoryController);

module.exports = router;