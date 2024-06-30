import { Router } from "express";
const router = Router()

import auth from "../controllers/authController.js";

router.route("/signup").post(auth)

export default router;