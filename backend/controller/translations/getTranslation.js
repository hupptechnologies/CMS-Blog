const Translations = require("../../models/translation");

const fetchTranslationsController = async (req, res) => {
  try {
    const { language, type } = req.query;

    if ((language && type) || (!language && !type)) {
      return res.status(400).json({
        message: "You must pass exactly one of 'language' or 'type', but not both."
      });
    }

    if (type === 'all') {
      const languages = await Translations.findAll({
        attributes: ['language'],
        group: ['language']
      });
      const languageList = languages.map(lang => lang.language);
      return res.json({ languages: languageList, success: true, totalCount: languageList.length });
    }

    if (!language) {
      return res.status(400).json({ message: "Language parameter is required" });
    }

    const translation = await Translations.findOne({
      where: { language },
    });

    if (translation) {
      res.json({ translation: translation.translations, success: true });
    } else {
      res.status(404).json({ message: "Translations not found" });
    }
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = fetchTranslationsController;