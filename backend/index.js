const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/index");
const cors = require("cors");
const morgan = require("morgan");
const { RateLimiterMemory } = require("rate-limiter-flexible");
const helmet = require("helmet");
const logger = require("./logger");
const cronJob = require("./schedulers/blogScheduler");
const { insertLogEntry } = require('./databaseHelper');

const app = express();
const port = 3008;
const allowedOrigins = ["http://localhost:3001", "http://localhost:3000", "http://localhost:3008", "http://192.168.1.64:3000"];

// Use Helmet to secure HTTP headers
app.use(helmet());

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/logs") || req.method === "OPTIONS" || req.originalUrl.startsWith("/api/translate")) {
    return next();
  }
  res.on("finish", async () => {
    try {
      await insertLogEntry(
        'info',
        `Request processed: ${req.method} ${req.originalUrl} - Status: ${res.statusCode}`,
        {
          status: res.statusCode,
          headers: req.headers,
          query: req.query,
          body: req.body,
          response: res.body,
        },
        new Date(),
        new Date()
      );
    } catch (err) {
      console.error("Error saving log to database:", err);
    }
  });
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (req.originalUrl.startsWith("/api/logs") || req.originalUrl.startsWith("/api/translate")) {
    return next(err);
  }

  insertLogEntry(
    'error',
    `Error occurred: ${err.message}`,
    {
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      body: req.body,
    },
    new Date(),
    new Date()
  ).catch((err) => console.error("Error saving log to database:", err));
  res.status(500).send("Something went wrong!");
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

const rateLimiter = new RateLimiterMemory({
  points: 15,
  duration: 1,
});

app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
    });
});

app.use(bodyParser.json());
app.use("/api", route);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

cronJob();
