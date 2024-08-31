import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "The name is required"],
			trim: true,
			minlength: [2, "The name must be at least 2 characters long"],
			maxlength: [50, "The name must be less than 50 characters long"],
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
		photo: {
			type: String,
			default: "/users/default-user.jpg",
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		role: {
			type: String,
			enum: ["user", "host"],
			default: "user",
		},
		countryCode: {
			type: String,
			trim: true,
		},
		listings: [{ type: mongoose.Schema.ObjectId, ref: "Listing" }],
	},
	{
		timestamps: true, // add createdAt..
		versionKey: false, // removes __v that mongodb adds
		collection: "users",
		// toJSON or toObject, change behaviour depending on how they are sent from the db
		// capped -> set a limit, auto removes old entries (useful for logs)
	}
);

// hashes password before saving into db
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	next();
});

// compares stored password with inputed one
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10
		);

		return JWTTimestamp < changedTimestamp;
	}

	// false means not changed
	return false;
};

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString("hex");

	this.passwordResetToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

	return resetToken;
};

const User = mongoose.model("User", userSchema);

export default User;
