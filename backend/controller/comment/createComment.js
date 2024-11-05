const Comment = require("../../models/comment");
const Reply = require("../../models/reply");

const createCommentController = async (req, res) => {
  const { blog_id, content, status, replies } = req.body;
  const { user } = req;

  try {
    // Create the comment
    const comment = await Comment.create({
      blog_id,
      author_id: user.id,
      content,
      status,
    });

    // Create replies if provided
    if (replies && replies.length > 0) {
      for (const reply of replies) {
        await Reply.create({
          comment_id: comment.id,
          author_id: reply.userId,
          content: reply.text,
        });
      }
    }

    res.status(201).json({
      success: true,
      data: comment,
      message: "Comment and replies created successfully!",
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

const createReplyController = async (req, res) => {
  const { comId, userId, text } = req.body;
  try {
    await Reply.create({
      comment_id: comId,
      author_id: userId,
      content: text,
    });
    res.status(201).json({
      success: true,
      message: "Replies created successfully!",
    });
  } catch (error) {
    console.error("Error creating replies:", error);
    res.status(500).json({ message: "Error creating replies" });
  }
};

module.exports = { createCommentController, createReplyController };
