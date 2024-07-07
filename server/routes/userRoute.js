import { Router } from "express";
const router = Router();

import {deleteUser, updateUser, getListings} from "../controllers/userController.js"
import verifyJWT from "../utiles/verifyJWT.js";

router.route('/update/:id').post(verifyJWT,updateUser);
router.route('/delete/:id').delete(verifyJWT,deleteUser);
router.route('/listings/:id').get(verifyJWT,getListings);

export default router