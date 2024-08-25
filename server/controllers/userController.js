import multer from "multer";
import User from "../models/userModel.js";
import AppError from "./../utils/appError.js";
import catchAsync from "./../utils/catchAsync.js";
import handlerFactory from "./handlerFactory.js";

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

const userController = {
	uploadUserPhoto: upload.single("photo"),

	// image processing
	resizeUserPhoto: catchAsync(async (req, res, next) => {
		if (!req.file) return next();

		req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

		await sharp(req.file.buffer)
			.resize(500, 500)
			.toFormat("jpeg")
			.jpeg({ quality: 90 })
			.toFile(`public/img/users/${req.file.filename}`);

		next();
	}),
	// end image processing stuff

	filterObj: (obj, ...allowedFields) => {
		const newObj = {};
		Object.keys(obj).forEach((el) => {
			if (allowedFields.includes(el)) newObj[el] = obj[el];
		});
		return newObj;
	},

	updateMe: catchAsync(async (req, res, next) => {
		// 1. Create an error if the user POSTs password data
		if (req.body.password || req.body.passwordConfirm) {
			return next(
				new AppError(
					"This route is not for password updated. Please use /updateMyPassword",
					400
				)
			);
		}

		// 2. Filter out unwanted fields
		const filteredBody = filterObj(req.body, "name", "email");

		// 3. Update user document
		const updatedUser = await User.findByIdAndUpdate(
			req.user.id,
			filteredBody,
			{
				new: true,
				runValidators: true,
			}
		);

		res.status(200).json({
			status: "success",
			data: {
				user: updatedUser,
			},
		});
	}),

	createUser: (req, res) => {
		res.status(500).json({
			status: "error",
			message: "This route is not defined! Please use /signup instead",
		});
	},

	getMe: (req, res, next) => {
		req.params.id = req.user.id;
		next();
	},

	getAllUsers: handlerFactory.getAll(User),
	getUser: handlerFactory.getOne(User),

	// Do NOT update passwords with this!
	deleteUser: handlerFactory.deleteOne(User),
	updateUser: handlerFactory.updateOne(User),
};

export default userController;
