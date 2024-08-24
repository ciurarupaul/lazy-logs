import Booking from "./../models/bookingModel.js";
import handlerFactory from "./handlerFactory.js";

const bookingController = {
	setListingUserIds: (req, res, next) => {
		if (!req.body.listing) req.body.listing = req.params.listingId;
		if (!req.body.user) req.body.user = req.user.id;

		next();
	},

	createBooking: handlerFactory.createOne(Booking),
	getAllBookings: handlerFactory.getAll(Booking),
	getBooking: handlerFactory.getOne(Booking),
	updateBooking: handlerFactory.updateOne(Booking),
	deleteBooking: handlerFactory.deleteOne(Booking),
};

export default bookingController;
