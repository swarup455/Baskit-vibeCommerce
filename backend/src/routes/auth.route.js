import { Router } from "express"
import { getUser, loginUser, logoutUser, signupUser } from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login-user", loginUser);
authRouter.post("/signup-user", signupUser);
authRouter.delete("/logout-user", verifyJwt, logoutUser);
authRouter.get("/get-user", verifyJwt, getUser);

export default authRouter