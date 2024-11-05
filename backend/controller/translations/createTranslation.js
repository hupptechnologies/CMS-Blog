const Translations = require("../../models/translation");

const createTranslationController = async (req, res) => {
  try {
    const { language, translations } = req.body;

    if (!language || !translations) {
      return res.status(400).json({ error: "Language and translations are required" });
    }
    const existingTranslation = await Translations.findOne({ where: { language } });

    if (existingTranslation) {
      const [numberOfAffectedRows, [updatedTranslation]] = await Translations.update(
        { translations, status: "active" },
        { where: { language }, returning: true }
      );

      if (numberOfAffectedRows === 0) {
        return res.status(404).json({ error: "Translation not found" });
      }

      return res.status(200).json({
        translations: updatedTranslation.translations,
        success: true,
        message: "Translation updated successfully"
      });
    } else {
      const newTranslation = await Translations.create({
        language,
        translations,
        status: "active"
      });
      return res.status(201).json({
        translations: newTranslation.translations,
        success: true,
        message: "translation created successfully"
      });
    }
  } catch (error) {
    console.error('Error creating/updating translation:', error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = createTranslationController;