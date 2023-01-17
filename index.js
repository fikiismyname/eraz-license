const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan"); // for logging requests
const winston = require("winston"); // for logging events

const app = express();

// Connect to MongoDB database
mongoose.set("strictQuery", true);
mongoose.connect(
  "mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const licenseSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    unique: true,
  },
  expiration_date: {
    type: Date,
    required: true,
  },
});

const License = mongoose.model("License", licenseSchema);

// create a custom logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.Console(), // for real-time logging in the console
  ],
});

// use morgan for logging requests
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

// enable CORS
const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.get("/validate-license/:url", async (req, res) => {
  try {
    // Check if license has expired
    const license = await License.findOne({ url: req.params.url });
    if (!license) {
      res.status(404).json({ message: "Invalid license URL!" });
    } else if (license.expiration_date < new Date().getTime()) {
      res.status(401).json({ message: "License expired!" });
    } else {
      res.status(200).json({ message: "License valid!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error validating license!" });
  }
});

app.get("/licenses", async (req, res) => {
  try {
    // Get all licenses
    const licenses = await License.find();
    if (licenses.length === 0) {
      res.status(404).json({ message: "No licenses found!" });
    } else {
      res.status(200).json(licenses);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching licenses!" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
