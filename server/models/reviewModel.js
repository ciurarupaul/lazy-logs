import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A review must have a user"],
		},
		listing: {
			type: mongoose.Schema.ObjectId,
			ref: "Listing",
			required: [true, "A review must be associated with a listing"],
		},
		rating: {
			type: Number,
			required: [true, "A review must have a rating"],
			min: [1, "Rating can be at least 1"],
			max: [5, "Rating can be at most 5"],
		},
		comment: {
			type: String,
			validate: {
				validator: function (value) {
					return !value || value.length <= 750;
				},
				message: "Comment must be 750 characters or less",
			},
		},
	},
	{
		timestamps: true,
		versionKey: false,
		collection: "reviews",
	}
);

reviewSchema.index({ user: 1 });
reviewSchema.index({ listing: 1 });
reviewSchema.index({ rating: 1 });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
