import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import mongoose from "mongoose";

const wishlistController = {
	fetchWishlist: catchAsync(async (req, res, next) => {
		const user = await User.findById(req.user._id).populate("wishlist");

		// convert to array of string - easier to convert here and on front cant work with obj ids
		const wishlist = user.wishlist
			? user.wishlist.map((listing) => listing._id.toString())
			: [];

		res.status(200).json({
			status: "success",
			data: {
				wishlist,
			},
		});
	}),

	addToWishlist: catchAsync(async (req, res, next) => {
		const { listingId } = req.body;
		const user = await User.findById(req.user._id);

		// received id is string - convert to obj id
		const listingObjectId = new mongoose.Types.ObjectId(listingId);

		if (!mongoose.Types.ObjectId.isValid(listingId)) {
			throw new AppError("Invalid listing ID");
		}

		if (user.wishlist.some((id) => id.equals(listingObjectId))) {
			return res.status(400).json({
				status: "fail",
				message: "Listing already in wishlist",
				data: {
					wishlist: user.wishlist.map((id) => id.toString()),
				},
			});
		}

		user.wishlist.push(listingObjectId);
		await user.save();

		// when sending back data, convert back to string
		const updatedWishlist = user.wishlist.map((id) => id.toString());

		res.status(200).json({
			status: "success",
			data: {
				wishlist: updatedWishlist,
			},
		});
	}),

	removeFromWishlist: catchAsync(async (req, res, next) => {
		const { listingId } = req.params;
		const user = await User.findById(req.user._id);
		const listingObjectId = new mongoose.Types.ObjectId(listingId);

		user.wishlist = user.wishlist.filter(
			(id) => !id.equals(listingObjectId)
		);

		await user.save();

		const updatedWishlist = user.wishlist.map((id) => id.toString());

		res.status(200).json({
			status: "success",
			data: {
				wishlist: updatedWishlist,
			},
		});
	}),
};

export default wishlistController;
