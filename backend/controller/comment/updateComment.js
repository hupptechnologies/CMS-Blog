const Comment = require("../../models/comment");

const updateCommentController = async (req, res) => {
  const { id } = req.params;
  const { content, status } = req.body;

  try {
    const [updated] = await Comment.update(
      { content, status },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const updatedComment = await Comment.findByPk(id);
    res.status(200).json({
      success: true,
      data: updatedComment,
      message: "Comment updated successfully!",
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment" });
  }
};

module.exports = updateCommentController;
