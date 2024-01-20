const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  console.error("Please define MONGO_URL environment variables");
  process.exit(1);
}

mongoose.connect(MONGO_URL);

app.use(express.json());
// Use the cors middleware
app.use(cors());
app.use("/user", require("./routes/user"));

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
