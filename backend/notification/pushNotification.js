require("dotenv").config();
const { default: axios } = require("axios");

const pushNotificationController = async (req, res) => {
  const { title, message } = req.body;

  try {
    await axios.post(
      "https://onesignal.com/api/v1/notifications",
      {
        app_id: process.env.ONE_SIGNAL_APP_ID,
        headings: { en: title },
        contents: { en: message },
        included_segments: ["All"],
      },
      {
        headers: {
          Authorization: `Basic ${process.env.ONE_SIGNAL_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.error("Error sending notification", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
};

module.exports = pushNotificationController;