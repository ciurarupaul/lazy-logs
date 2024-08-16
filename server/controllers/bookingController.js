const Booking = require("./../models/bookingModel");
const factory = require("./handlerFactory");

exports.setListingUserIds = (req, res, next) => {
	if (!req.body.listing) req.body.listing = req.params.listingId;
	if (!req.body.user) req.body.user = req.user.id;

	next();
};

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
