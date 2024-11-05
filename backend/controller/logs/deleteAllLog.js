const Log = require("../../models/log");

const deleteAllLogController = async (req, res) => {
  try {
    const result = await Log.destroy({ where: {} });
    res.status(200).json({ message: "All logs deleted successfully", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Error deleting database logs:", error);
    res.status(500).json({ message: "Error deleting database logs" });
  }
};

module.exports = deleteAllLogController;
