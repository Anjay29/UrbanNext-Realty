import { Router } from "express";
const router = Router()

import {auth, googleAuth, signIn} from "../controllers/authController.js";

router.route("/signup").post(auth)
router.route("/login").post(signIn)
router.route("/auth/google").post(googleAuth)

export default router;