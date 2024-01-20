const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 
const ExpressError = require('./utils/ExpressError');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 5000;

const dbURL = process.env.DB_URL;
mongoose.connect(dbURL);


const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));


app.use(cors({ origin: "*", credentials: true}));
app.use (cookieParser(process.env.JWT_SECRET ));
app.use(express.json());

const userRouter = require("./routes/user");
app.use("/user", userRouter);

const warehouseRouter = require("./routes/warehouse");
app.use("/warehouse", warehouseRouter);

const productRouter = require("./routes/products");
app.use("/product", productRouter);



app.use("/", (req, res) => {
  res.send("Hello World!");
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).json({ message });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
