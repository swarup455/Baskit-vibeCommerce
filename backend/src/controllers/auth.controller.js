import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
};

//controller for login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "both email and password required!")
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "User not found!!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password!");
    }

    const userId = user?._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

    const userResponse = await User.findById(userId).select("-password");

    return res
        .status(200)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                200,
                userResponse,
                "Successfully loggeg in!!"
            )
        )
})

//controller for signup user
export const signupUser = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new ApiError(400, "both email and password required!")
    }
    const user = await User.findOne({ email });
    if (user) {
        throw new ApiError(409, "user already exist!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword
    })
    const userId = newUser?._id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const currUser = await User.findById(userId).select("-password");

    return res
        .status(201)
        .cookie("token", token, options)
        .json(
            new ApiResponse(
                201,
                currUser,
                "Signed up user successfully!!"
            )
        )
})

//controller for logout user
export const logoutUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("token", options)
        .json(
            200,
            {},
            "Logged out successfully!!"
        )
})

//controller for get the current user
export const getUser = asyncHandler(async (req, res) => {
    const user = req.user;

    return res
        .status(201)
        .json(
            new ApiResponse(201, user, "user fetched successfully!!")
        )
})