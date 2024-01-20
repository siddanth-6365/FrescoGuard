const bcrypt = require("bcrypt");
const UserModel = require("../../models/user/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  const { name, email, password, type } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hash password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      type,
    });

    // Save user to the database
    const savedUser = await newUser.save();


    res.status(201).json("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    console.log(token);
    res.cookie("token", token, {user: user._id, httpOnly: true, maxAge: 60 * 60 * 1000});

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await UserModel.findById(id).populate('warehouses');
        res.status(200).json(user);
    } catch (error) {
        console.error("Error getting user:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
};
