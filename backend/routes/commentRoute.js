const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const validateUser = require("../middlewares/validateUser");
const {
  createCommentController,
  createReplyController,
} = require("../controller/comment/createComment");
const updateCommentController = require("../controller/comment/updateComment");
const deleteCommentController = require("../controller/comment/deleteComment");
const {
  getAllCommentsController,
  getCommentByIdController,
  getCommentByBlogIdController,
} = require("../controller/comment/getComment");

// Routes for comments
router.post("/comments", verifyToken, validateUser, createCommentController);
router.get("/comments", verifyToken, getAllCommentsController);
router.get("/comments/:id", verifyToken, getCommentByIdController);
router.get("/comment/blog", verifyToken, getCommentByBlogIdController);
router.put("/comments/:id", verifyToken, updateCommentController);
router.delete("/comments/:id", verifyToken, deleteCommentController);
router.post("/reply", verifyToken, createReplyController);

module.exports = router;
