import express from "express";
import listingController from "../controllers/listingController.js";

const listingRouter = express.Router();

listingRouter.get("/", listingController.getAllListings);
listingRouter.post("/", listingController.createListing);

listingRouter.get("/:id", listingController.getListing);
listingRouter.delete("/:id", listingController.deleteListing);

export default listingRouter;
