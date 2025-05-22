import express from "express";
import { authController } from "../controllers/index.js";


const authRouter = express.Router();

authRouter.route("/signup")
    .post(authController.signup);

authRouter.route("/signin")
    .post(authController.signin);

authRouter.route("/signout")
    .post(authController.signout);

authRouter.route("/email-verification")
    .post(authController.verifyEmail);

export default authRouter;
