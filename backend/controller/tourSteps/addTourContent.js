const TourSteps = require("../../models/tourSteps");

const createTourContentController = async (req, res) => {
  try {
    const tourStepsArray = req.body;

    if (!Array.isArray(tourStepsArray) || tourStepsArray.length === 0) {
      return res.status(400).json({ error: "Invalid input: Expected an array of tour steps" });
    }

    const results = await Promise.all(
      tourStepsArray.map(async ({ target, content, placement }) => {
        if (!target || !content) {
          return { success: false, message: `Target and content are required for ${target}` };
        }

        const existingTourStep = await TourSteps.findOne({ where: { target } });

        if (existingTourStep) {
          return { success: false, message: `Content already exists for ${target}` };
        }

        try {
          const newTourStep = await TourSteps.create({
            target,
            content,
            placement
          });
          return { success: true, message: `Content created successfully for ${target}`, data: newTourStep };
        } catch (creationError) {
          console.error(`Error creating content for ${target}:`, creationError);
          return { success: false, message: `Error creating content for ${target}` };
        }
      })
    );
    const successResults = results.filter(result => result.success);
    const errorResults = results.filter(result => !result.success);

    return res.status(200).json({
      success: true,
      message: `${successResults.length} tour steps created successfully`,
      created: successResults,
      errors: errorResults
    });
  } catch (error) {
    console.error('Error creating/updating tour step:', error);
    res.status(500).json({ message: "An error occurred while creating/updating tour step" });
  }
};

module.exports = createTourContentController;