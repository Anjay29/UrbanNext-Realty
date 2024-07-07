import { Router } from "express"
const router = Router();

import verifyJWT from "../utiles/verifyJWT.js";
import {createListing, deleteListing, updateListing} from "../controllers/listingController.js"

router.route("/listing/create").post(verifyJWT,createListing)
router.route("/delete-listing/:id").delete(verifyJWT,deleteListing)
router.route("/update-listing/:id").post(verifyJWT,updateListing)

export default router