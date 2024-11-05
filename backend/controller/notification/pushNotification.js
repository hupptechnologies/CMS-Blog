let clients = [];

const sendNotification = (message) => {
  clients.forEach((client) =>
    client.write(`data: ${JSON.stringify(message)}\n\n`)
  );
};

const eventController = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const message = "Server-Sent Event Connected\n\n";
  res.write(message);

  clients.push(res);

  req.on("close", () => {
    clients = clients.filter((client) => client !== res);
  });
};

const pushNotificationController = async (req, res) => {
  sendNotification(req.body);
  res.status(200).json({ message: "Notification sent", success: true });
};

module.exports = {
  eventController,
  pushNotificationController,
};
