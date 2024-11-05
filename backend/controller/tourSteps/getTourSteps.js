const TourSteps = require("../../models/tourSteps");

const fetchTourStepsController = async (req, res) => {
  try {
    const tourStepsList = await TourSteps.findAll({
      order: [['id', 'ASC']]
    });
    res.json({ tourStepsList, success: true });
  } catch (error) {
    console.error("Error fetching tour steps:", error.message);
    res.status(500).json({ message: "An error occurred while fetching tourStep" });
  }
};

module.exports = fetchTourStepsController;
