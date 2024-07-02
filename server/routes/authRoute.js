import { Router } from "express";
const router = Router()

import {auth, signIn} from "../controllers/authController.js";

router.route("/signup").post(auth)
router.route("/login").post(signIn)

export default router;