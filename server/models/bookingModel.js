import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: [true, "A booking must have a user"],
		},
		listing: {
			type: mongoose.Schema.ObjectId,
			ref: "Listing",
			required: [true, "A booking must have a listing"],
		},
		startDate: {
			type: Date,
			required: [true, "A booking must have a start date"],
		},
		endDate: {
			type: Date,
			required: [true, "A booking must have an end date"],
			validate: {
				validator: function (value) {
					return value > this.startDate;
				},
				message: "End date must be after the start date",
			},
		},
		totalPrice: {
			type: Number,
			required: [true, "A booking must have a total price"],
			min: [0, "Total price must be a positive number"],
		},
		specialRequests: {
			type: String,
			max: [300, "A request cannot have more than 300 words"],
		},
	},
	{
		timestamps: true,
		versionKey: false,
		collection: "bookings",
	}
);

// Indexes for optimization of data retrieving operations
bookingSchema.index({ user: 1 });
bookingSchema.index({ listing: 1 });
bookingSchema.index({ startDate: 1 });
bookingSchema.index({ endDate: 1 });

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
