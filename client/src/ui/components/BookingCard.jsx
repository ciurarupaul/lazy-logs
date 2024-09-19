import { format, isAfter, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCalendar } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { cancelBooking } from "../../services/apiBookings";

function BookingCard({ booking }) {
	const [time, setTime] = useState("");
	const today = new Date();
	const navigate = useNavigate();

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
					<button
						className="bookings__card-extra-btn"
						onClick={() => {
							navigate(`/listings/${booking.listing._id}`);
						}}
					>
						View property
					</button>

					<>
						{time === "past" ? null : time === "future" ? ( // MIGHT do this later // </button> // 	Leave a review // <button className="bookings__card-extra-btn">
							<button
								className="bookings__card-extra-btn"
								onClick={async () => {
									cancelBooking(booking._id);
									toast.success("Booking canceled!", {
										className: "toast toast-success",
									});
								}}
							>
								Cancel booking
							</button>
						) : null}
					</>
				</div>
			</div>
		</div>
	);
}

export default BookingCard;
