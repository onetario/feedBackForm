const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const form = require("./model");
require("dotenv").config();

const app = express();

const url = process.env.URL;

app.use(cors());
app.use(express.json()); // Add this to parse JSON request bodies

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection error", err);
    process.exit(1); // Exit process with failure
  }
};

connectDB();

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database is open");
});
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.post("/form", (req, res) => {
  const { name, age, phone, country, feedback } = req.body;
  console.log("Received data:", req.body);
  res.status(200).json({ message: "Form data received successfully!" });

  const formData = new form({ name, age, phone, country, feedback });
  formData.save();
});

app.get("/form-data", async (req, res) => {
  try {
    const allFormData = await form.find();
    res.status(200).json(allFormData);
  } catch (err) {
    console.error("Error fetching form data", err);
    res.status(500).json({ message: "Error fetching form data" });
  }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
