import { User } from "../modules/User.js";
import bcrypt from 'bcryptjs';
import { generateToken } from "../utils/generateToken.js";

export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "You already have an account" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await User.create({
      username,
      email,
      password: hash,
    });

    let token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      token,
    });
  } catch (error) {
    console.error("Error in RegisterUser:", error);
    res.status(500).json({ message: "Signup failed. Please try again." });
  }
};


export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    let token = generateToken(user);
    res.cookie("token", token, { httpOnly: true });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.error("Error in login User", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ id: user._id, username: user.username, email: user.email });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

