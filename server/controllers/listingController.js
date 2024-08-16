const Listing = require("./../models/listingModel");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const factory = require("./handlerFactory");
const multer = require("multer");
const sharp = require("sharp");

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

exports.uploadListingImages = upload.fields([
	{ name: "imageCover", maxCount: 1 },
	{ name: "images", maxCount: 9 },
]);

exports.resizeListingImages = catchAsync(async (req, res, next) => {
	if (!req.files.imageCover || !req.files.images) return next();

	// 1. Cover image
	req.body.imageCover = `listing-${req.params.id}-${Date.now()}-cover.jpeg`;

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
});

exports.getAllListings = factory.getAll(Listing);
exports.getListing = factory.getOne(Listing, { path: "reviews" });
// also populate the reviews when getting a Listing

exports.createListing = factory.createOne(Listing);
exports.updateListing = factory.updateOne(Listing);
exports.deleteListing = factory.deleteOne(Listing);
