const Activity = require("../../models/activity");

const deleteActivityById = async (req, res) => {
    const activityId = req.query.activityId;
  try {
    const result = await Activity.destroy({
      where: { id: req.query.activityId },
    });
    if (result === 0) {
        return res.status(400).json({ success: false, message: `No activity found with ID ${activityId}` });
    } else {
      return res.status(200).json({ success: true, message: `Activity with ID ${activityId} deleted` });
    }
  } catch (error) {
    console.error("Error deleting activity by ID:", error);
  }
};

module.exports = deleteActivityById;