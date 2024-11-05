const Comment = require("../../models/comment");

const deleteCommentController = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Comment.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};

module.exports = deleteCommentController;
