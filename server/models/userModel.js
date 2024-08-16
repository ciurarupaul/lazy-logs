const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		// add validations
		firstName: {
			type: String,
		},
		lastName: {
			type: String,
		},
		email: {
			type: String,
			unique: true,
		},
		photo: String,
		password: {
			type: String,
			select: false,
		},
		passwordConfirm: {
			type: String,
		},
		role: {
			type: String,
			enum: ["user", "host"],
			default: "user",
		},
		nationality: {
			type: String,
		},
		// for hosts
		listings: [{ type: mongoose.Schema.ObjectId, ref: "Listing" }],

		// add password reset - later with all login logic
	},
	{
		timestamps: true, // add createdAt..
		versionKey: false, // removes __v that mongodb adds
		// toJSON or toObject, change behaviour depending on how they are sent from the db
		collection: users,
		// capped -> set a limit, auto removes old entries (useful for logs)
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
