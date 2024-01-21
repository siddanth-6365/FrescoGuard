const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const ExpressError = require("./utils/ExpressError");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(cors({ origin: "*", credentials: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const warehouseRouter = require("./routes/warehouse");
app.use("/warehouse", warehouseRouter);

const productRouter = require("./routes/products");
app.use("/product", productRouter);

const alert = require("./routes/alert");
app.use("/alert", alert);

app.post("/dashboard/ml", async (req, res) => {
  try {
    const cropData = req.body;
    console.log("cropData :", cropData);

    const apiUrl2 = "https://dummy-ug4x.onrender.com/spoilage";
    const response2 = await fetch(apiUrl2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cropData),
    });

    if (!response2.ok) {
      throw new Error(`Error: ${response2.statusText}`);
    }

    const data2 = await response2.json();
    console.log("data2 :", data2);
    res.json(data2);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
