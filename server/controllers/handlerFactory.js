import APIFeatures from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const handlerFactory = {
	deleteOne: (Model) =>
		catchAsync(async (req, res, next) => {
			const document = await Model.findByIdAndDelete(req.params.id);

			if (!document) {
				return next(
					new AppError("No document found with that ID", 404)
				);
			}

			res.status(204).json({
				status: "succes",
				data: null,
			});
		}),

	updateOne: (Model) =>
		catchAsync(async (req, res, next) => {
			const document = await Model.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
					runValidators: true,
				}
			);

			if (!document) {
				return next(
					new AppError(`No document found with that ID`, 404)
				);
			}

			res.status(200).json({
				status: "success",
				data: {
					data: document,
				},
			});
		}),

	createOne: (Model) =>
		catchAsync(async (req, res, next) => {
			const document = await Model.create(req.body);

			res.status(201).json({
				status: "success",
				data: {
					document,
				},
			});
		}),

	getOne: (Model, popOptions) =>
		catchAsync(async (req, res, next) => {
			let query = Model.findById(req.params.id);
			if (popOptions) query = query.populate(popOptions);
			const document = await query;

			if (!document) {
				return next(
					new AppError("No document found with that ID", 404)
				);
			}

			res.status(200).json({
				status: "succes",
				data: {
					document,
				},
			});
		}),

	getAll: (Model) =>
		catchAsync(async (req, res, next) => {
			// to allow for nested GET reviews on tour
			let filter = {};
			if (req.params.tourId) filter = { tour: req.params.tourId };

			const features = new APIFeatures(Model.find(), req.query)
				.filter()
				.sort()
				.limitFields()
				.paginate();
			const document = await features.query;
			// const document = await features.query.explain();

			res.status(200).json({
				status: "succes",
				results: document.length,
				data: {
					data: document,
				},
			});
		}),
};

export default handlerFactory;
