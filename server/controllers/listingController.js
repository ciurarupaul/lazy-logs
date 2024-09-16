import mongoose from "mongoose";
import multer from "multer";
import sharp from "sharp";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";
import Listing from "./../models/listingModel.js";
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

	getAllListings: catchAsync(async (req, res, next) => {
		const listings = await Listing.aggregate([
			{
				$lookup: {
					from: "reviews",
					localField: "_id",
					foreignField: "listing",
					as: "reviews",
				},
			},
		]);

		res.status(200).json({
			status: "succes",
			results: listings.length,
			data: {
				data: listings,
			},
		});
	}),

	getListing: catchAsync(async (req, res, next) => {
		const listingId = req.params.id;

		const listing = await Listing.aggregate([
			{ $match: { _id: new mongoose.Types.ObjectId(listingId) } },

			// include both reviews and host details
			{
				$lookup: {
					from: "reviews",
					localField: "_id",
					foreignField: "listing",
					as: "reviews",
				},
			},
			{
				$lookup: {
					from: "users",
					localField: "host",
					foreignField: "_id",
					as: "host",
				},
			},

			// host becomes a single object
			{ $unwind: "$host" },

			// vonverts the reviews array into individual documents. if there are no reviews, it preserves the empty array.
			{ $unwind: { path: "$reviews", preserveNullAndEmptyArrays: true } },

			// do the same for the reviews' users
			{
				$lookup: {
					from: "users",
					localField: "reviews.user",
					foreignField: "_id",
					as: "reviews.user",
				},
			},
			{
				$unwind: {
					path: "$reviews.user",
					preserveNullAndEmptyArrays: true,
				},
			},

			// group back together
			{
				$group: {
					_id: "$_id",
					title: { $first: "$title" },
					description: { $first: "$description" },
					host: { $first: "$host" },
					reviews: { $push: "$reviews" },
				},
			},
		]);

		if (!listing.length) {
			return next(new AppError("No listing found with that ID", 404));
		}

		res.status(200).json({
			status: "success",
			data: {
				data: listing[0],
			},
		});
	}),

	createListing: handlerFactory.createOne(Listing),
	updateListing: handlerFactory.updateOne(Listing),
	deleteListing: handlerFactory.deleteOne(Listing),
};

export default listingController;
