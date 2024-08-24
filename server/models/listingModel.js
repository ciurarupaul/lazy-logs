import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
	{
		host: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "Host is required"],
		},
		location: {
			county: {
				type: String,
				required: [true, "County is required"],
			},
			city: {
				type: String,
			},
			commune: {
				type: String,
			},
			village: {
				type: String,
			},
			zipcode: {
				type: String,
				required: [true, "Zipcode is required"],
				validate: {
					validator: (v) => /^[0-9]{6}$/.test(v),
					message: "Invalid Romanian zipcode format",
				},
			},
			// coordinates: {
			// 	type: [Number],
			// 	index: "2dsphere",
			// },
		},
		pricePerNight: {
			type: Number,
			required: [true, "Price per night is required"],
			min: [0, "Price per night must be a positive number"],
		},
		discount: {
			type: Number,
			validate: {
				validator: function (value) {
					return value == null || value < this.pricePerNight;
				},
				message: "Discount must be less than the price per night",
			},
		},
		currency: {
			type: String,
			default: "RON",
			enum: ["RON", "EUR", "USD", "GBP"],
		},
		photos: [String],
		amenities: [String],
		houseRules: [String],
		description: {
			type: String,
			required: [true, "Description is required"],
			minlength: [10, "Description must be at least 10 characters long"],
		},
		listingDetails: {
			bedrooms: {
				type: Number,
				required: [true, "Number of bedrooms is required"],
				min: [0, "Number of bedrooms cannot be negative"],
			},
			bathrooms: {
				type: Number,
				required: [true, "Number of bathrooms is required"],
				min: [0, "Number of bathrooms cannot be negative"],
			},
			beds: {
				type: Number,
				required: [true, "Number of beds is required"],
				min: [0, "Number of beds cannot be negative"],
			},
			maxGuests: {
				type: Number,
				required: [true, "Maximum number of guests is required"],
				min: [1, "Maximum number of guests must be at least 1"],
			},
		},
		blockedDates: [Date],
		reviews: [
			{
				type: mongoose.Schema.ObjectId,
				ref: "Review",
			},
		],
		ratingsAverage: {
			type: Number,
			default: 0,
			min: [1, "Rating must be above 1"],
			max: [5, "Rating must be below 5"],
			set: (val) => Math.round(val * 10) / 10,
		},
		ratingsQuantity: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
		versionKey: false,
		collection: "listings",
	}
);

const Listing = mongoose.model("Listing", listingSchema);
export default Listing;
