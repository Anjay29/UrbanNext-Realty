import { Router } from "express";
const router = Router();

import {updateUser} from "../controllers/userController.js"
import verifyJWT from "../utiles/verifyJwt.js";

router.route('/update/:id').post(verifyJWT,updateUser);



export default router