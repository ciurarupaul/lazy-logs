import express from "express";
import authController from "../controllers/authController.js";
import wishlistController from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.use(authController.protect);

wishlistRouter.get("/", wishlistController.fetchWishlist);
wishlistRouter.post("/", wishlistController.addToWishlist);
wishlistRouter.delete("/:listingId", wishlistController.removeFromWishlist);

export default wishlistRouter;
