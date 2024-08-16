const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: [true, "First name is required"],
			trim: true,
			minlength: [2, "First name must be at least 2 characters long"],
			maxlength: [50, "First name must be less than 50 characters long"],
		},
		lastName: {
			type: String,
			required: [true, "Last name is required"],
			trim: true,
			minlength: [2, "Last name must be at least 2 characters long"],
			maxlength: [50, "Last name must be less than 50 characters long"],
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			validate: {
				validator: (v) => validator.isEmail(v),
				message: "Invalid email address",
			},
		},
		phoneNumber: {
			type: String,
			validate: {
				validator: (v) =>
					validator.isMobilePhone(v, "any", { strictMode: false }),
				message: "Invalid phone number",
			},
		},
		photo: String,
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
			minlength: [8, "Password must be at least 8 characters long"],
		},
		passwordConfirm: {
			type: String,
			required: [true, "Password confirmation is required"],
			validate: {
				validator: function (v) {
					return v === this.password;
				},
				message: "Passwords do not match",
			},
		},
		role: {
			type: String,
			enum: ["user", "host"],
			default: "user",
		},
		nationality: {
			type: String,
			trim: true,
		},
		// for hosts
		listings: [{ type: mongoose.Schema.ObjectId, ref: "Listing" }],

		// add password reset - later with all login logic
	},
	{
		timestamps: true, // add createdAt..
		versionKey: false, // removes __v that mongodb adds
		collection: "users",
		// toJSON or toObject, change behaviour depending on how they are sent from the db
		// capped -> set a limit, auto removes old entries (useful for logs)
	}
);

const User = mongoose.model("User", userSchema);
module.exports = User;
