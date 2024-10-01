import express from "express";
import reviewController from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/", reviewController.getAllReviews);
reviewRouter.post("/", reviewController.createReview);

reviewRouter.get("/:id", reviewController.getReview);
reviewRouter.patch("/:id", reviewController.updateReview);
reviewRouter.delete("/:id", reviewController.deleteReview);

export default reviewRouter;
