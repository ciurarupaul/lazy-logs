import { format, isAfter, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { IoCalendar } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";

function BookingCard({ booking }) {
	console.log(booking);

	const [time, setTime] = useState("");
	const today = new Date();

	useEffect(() => {
		if (
			isBefore(new Date(booking.startDate), today) &&
			isBefore(new Date(booking.endDate), today)
		) {
			setTime("past");
		} else if (
			isAfter(new Date(booking.startDate), today) &&
			isAfter(new Date(booking.endDate), today)
		) {
			setTime("future");
		} else {
			setTime("present");
		}
	}, []);

	return (
		<div className="bookings__card">
			<img
				src={booking.listing.photos[0]}
				alt="property photo"
				className="bookings__card-photo"
			/>
			<div className="bookings__card-content">
				<div className="bookings__card-summary">
					<div className="bookings__card-booking">
						Booking no. <span>#{booking._id}</span>
					</div>

					<div className="bookings__card-dates">
						<IoCalendar className="bookings__card-dates-icon" />
						<div className="bookings__card-dates-date">
							<span>Check-in</span>:{" "}
							{format(booking.startDate, "dd.MM.yyyy")}
						</div>
					</div>

					<div className="bookings__card-dates">
						<IoCalendar className="bookings__card-dates-icon" />
						<div className="bookings__card-dates-date">
							{" "}
							<span>Check-out</span>:{" "}
							{format(booking.endDate, "dd.MM.yyyy")}
						</div>
					</div>

					<div className="bookings__card-pay">
						<TbMoneybag className="bookings__card-pay-icon" />
						Pay at location: <p>{booking.totalPrice}&euro;</p>
					</div>
				</div>

				<div className="bookings__card-extra">
					{time === "past" ? (
						<button className="bookings__card-extra-btn">
							Leave a review
						</button>
					) : time === "future" ? (
						<button className="bookings__card-extra-btn">
							Add a request
						</button>
					) : null}
				</div>

				<div>
					{time === "past" ? (
						<div className="bookings__card-label bookings__card-label--past">
							Past
						</div>
					) : time === "future" ? (
						<div className="bookings__card-label">Upcoming</div>
					) : null}{" "}
				</div>
			</div>
		</div>
	);
}

export default BookingCard;
