import express from "express";
import wishlistController from "../controllers/wishlistController.js";
import authController from "../controllers/authController.js";
const router = express.Router();

router.use(authController.protect);

router
	.route("/")
	.get(wishlistController.fetchWishlist)
	.post(wishlistController.addToWishlist);

router.route("/:listingId").delete(wishlistController.removeFromWishlist);

export default router;
