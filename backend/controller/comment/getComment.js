const Blog = require("../../models/blog");
const User = require("../../models/user");
const Comment = require("../../models/comment");
const Reply = require("../../models/reply");

const getAllCommentsController = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [Blog, User],
    });

    res.status(200).json({
      success: true,
      data: comments,
      message: "Comments retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

const getCommentByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByPk(id, {
      include: [Blog, User],
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      success: true,
      data: comment,
      message: "Comment retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ message: "Error fetching comment" });
  }
};

const getCommentByBlogIdController = async (req, res) => {
  const { blogId } = req.query;

  try {
    const comments = await Comment.findAll({
      where: { blog_id: blogId },
      include: [
        {
          model: Reply,
          as: 'replies',
          attributes: ['id', 'content', 'author_id', 'created_at', 'updated_at'],
          include: [
            {
              model: User,
              attributes: ['id', 'username', 'img', 'email'],
            }
          ],
        },
        {
          model: User,
          attributes: ['id', 'username', 'img', 'email'],
        }
      ],
      order: [
        ['created_at', 'ASC'],
        ['replies', 'created_at', 'ASC']
      ],
    });
    const formattedComments = comments.map(comment => ({
      userId: comment.User.id,
      comId: comment.id,
      fullName: comment.User.username,
      avatarUrl: comment.User.img,
      userProfile: comment.User.email,
      text: comment.content,
      replies: comment.replies.map(reply => ({
        userId: reply.User.id,
        comId: reply.id,
        userProfile: reply.User.email,
        fullName: reply.User.username,
        avatarUrl: reply.User.img,
        text: reply.content
      }))
    }));
    res.json({
      comments: formattedComments,
      success: true,
      message: "Comments retrieved successfully!",
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "An error occurred while fetching comments" });
  }
};

module.exports = {
  getCommentByIdController,
  getAllCommentsController,
  getCommentByBlogIdController,
};
