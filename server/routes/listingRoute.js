import { Router } from "express"
const router = Router();

import verifyJWT from "../utiles/verifyJwt.js";
import {createListing} from "../controllers/listingController.js"

router.route("/listing/create").post(verifyJWT,createListing)

export default router