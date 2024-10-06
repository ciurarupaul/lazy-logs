import { format, isAfter, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function BookingCard({ booking, onCancel }) {
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
						<MdOutlineAttachMoney className="bookings__card-pay-icon" />
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
						<p>View property </p>
						<FaRegEye className="bookings__card-icon" />
					</button>

					<>
						{time === "past" ? null : time === "future" ? (
							<button
								className="bookings__card-extra-btn bookings__card-extra-btn-see"
								onClick={() => {
									onCancel(booking._id);
								}}
							>
								<p>Cancel booking </p>
								<MdCancel className="bookings__card-icon bookings__card-extra-btn-cancel" />
							</button>
						) : null}
					</>
				</div>
			</div>
		</div>
	);
}

export default BookingCard;
