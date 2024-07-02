import { Router } from "express";
const router = Router();

import userController from "../controllers/userController.js"
router.route('/user').get(userController)



export default router