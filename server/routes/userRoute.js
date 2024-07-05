import { Router } from "express";
const router = Router();

import {deleteUser, updateUser} from "../controllers/userController.js"
import verifyJWT from "../utiles/verifyJwt.js";

router.route('/update/:id').post(verifyJWT,updateUser);
router.route('/delete/:id').delete(verifyJWT,deleteUser);


export default router