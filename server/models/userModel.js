import bcrypt from "bcrypt";
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
		photo: String,
		password: {
			type: String,
			required: [true, "Password is required"],
			select: false,
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

// hashes password before saving into db
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await bcrypt.hash(this.password, 12);

	next();
});

// checks if the user inputed password is the same as the hashed one in the db
userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword
) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export default User;
