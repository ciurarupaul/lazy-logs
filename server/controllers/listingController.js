import multer from "multer";
import sharp from "sharp";
import Listing from "./../models/listingModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import handlerFactory from "./handlerFactory.js";

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith("image")) {
		cb(null, true);
	} else {
		cb(new AppError("Not an image, please upload an image!", 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

const listingController = {
	uploadListingImages: upload.fields([
		{ name: "imageCover", maxCount: 1 },
		{ name: "images", maxCount: 9 },
	]),

	resizeListingImages: catchAsync(async (req, res, next) => {
		if (!req.files.imageCover || !req.files.images) return next();

		// 1. Cover image
		req.body.imageCover = `listing-${
			req.params.id
		}-${Date.now()}-cover.jpeg`;

		await sharp(req.file.imageCover[0].buffer)
			.resize(2000, 1333)
			.toFormat("jpeg")
			.jpeg({ quality: 90 })
			.toFile(`public/img/listings/${req.body.imageCover}`);

		// 2. Images
		req.body.images = [];

		await Promise.all(
			req.files.images.map(async (file, i) => {
				const filename = `listing-${req.params.id}-${Date.now()}-${
					i + 1
				}.jpeg`;

				await sharp(file.buffer)
					.resize(2000, 1333)
					.toFormat("jpeg")
					.jpeg({ quality: 90 })
					.toFile(`public/img/listings/${filename}`);

				req.body.images.push(filename);
			})
		);

		next();
	}),

	getAllListings: handlerFactory.getAll(Listing),
	getListing: handlerFactory.getOne(Listing, [
		{ path: "host" },
		{ path: "reviews", populate: { path: "user" } },
	]),
	// also populate the host and reviews when getting a Listing

	createListing: handlerFactory.createOne(Listing),
	updateListing: handlerFactory.updateOne(Listing),
	deleteListing: handlerFactory.deleteOne(Listing),
};

export default listingController;
