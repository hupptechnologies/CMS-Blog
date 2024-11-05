const router = require("express").Router();
const verifyToken = require("../middlewares/verifyToken");
const checkAdmin = require("../middlewares/verifyUserRole");
const { createBlogController } = require("../controller/blogs/createBlog");
const { fetchAllBlogsController } = require("../controller/blogs/getAllBlogs");
const { likeBlogController } = require("../controller/likes/likeBlog");
const { viewBlogController } = require("../controller/views/viewBlog");
const { updateStatusBlogController } = require("../controller/blogs/updateBlogStatus");
const updateBlogController = require("../controller/blogs/updateBlog");

router.post("/create/blog", verifyToken, createBlogController);
router.post("/blogs", verifyToken, fetchAllBlogsController);
router.post("/blog/like", verifyToken, likeBlogController);
router.post("/blog/view", verifyToken, viewBlogController);
router.put("/blog", verifyToken, updateStatusBlogController);
router.put("/updateBlog", verifyToken, checkAdmin, updateBlogController);

module.exports = router;