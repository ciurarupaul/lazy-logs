const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema(
	{
		host: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
		location: {
			country: String,
			county: String,
			city: String,
			zipcode: String,
			// coordinates: {
			// 	type: [Number],
			// 	index: "2dsphere",
			// },
		},
		pricePerNight: {
			type: Number,
		},
		currency: {
			type: String,
			default: "RON",
		},
		photos: [String],
		amenities: [String],
		houseRules: [String],
		description: {
			type: String,
		},
		listingDetails: {
			bedrooms: {
				type: Number,
			},
			bathrooms: {
				type: Number,
			},
			beds: {
				type: Number,
			},
			maxGuests: {
				type: Number,
			},
		},
		blockedDates: [Dates],
		reviews: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Review",
			},
		],
		ratingsAverage: {
			type: Number,
			default: 4.5,
			min: [1, "Rating must be above 1.0"],
			max: [5, "Rating must be below 5.0"],
			set: (val) => Math.round(val * 10) / 10,
		},
	},
	{
		timestamps: true,
		versionKey: false,
		collection: "listings",
	}
);

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
