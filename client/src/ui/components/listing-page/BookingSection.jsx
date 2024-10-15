import {
	differenceInCalendarDays,
	eachDayOfInterval,
	isPast,
	isSameDay,
	isWithinInterval,
	parseISO,
} from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { createBooking } from "../../../../api/apiBookings";
import { useAuthContext } from "../../../context/authContext";
import handleError from "../../../utils/handleError";
import BookingPrice from "./BookingPrice";

const getBlockedDates = (blockedDates) => {
	let dates = [];
	blockedDates.forEach((interval) => {
		const start = parseISO(interval.startDate);
		const end = parseISO(interval.endDate);
		const days = eachDayOfInterval({ start, end });
		dates = dates.concat(days);
	});
	return dates;
};

const isDateInBlockedRange = (start, end, blockedDates) => {
	return blockedDates.some((blockedDate) =>
		isWithinInterval(blockedDate, { start, end })
	);
};

function BookingSection({ listing }) {
	const { authState } = useAuthContext();
	const { isAuthenticated } = authState;
	const navigate = useNavigate();
	const [range, setRange] = useState([null, null]);
	const [startDate, endDate] = range;
	const blockedDates = listing.blockedDates;
	const blockedDatesArray = getBlockedDates(blockedDates);

	const filteredDates = (date) => {
		return (
			!isPast(date) &&
			!blockedDatesArray.some((blockedDate) =>
				isSameDay(blockedDate, date)
			)
		);
	};

	const handleDateSelection = (dates) => {
		const [start, end] = dates;

		if (start && end) {
			if (isDateInBlockedRange(start, end, blockedDatesArray)) {
				setRange([null, null]);
			} else {
				setRange(dates);
			}
		} else {
			setRange(dates);
		}
	};

	const renderText = () => {
		if (!isAuthenticated) {
			return (
				<div className="listing__booking-text-login">
					Please{" "}
					<Link to="/login" className="listing__booking-text-link">
						login
					</Link>{" "}
					to book this property
				</div>
			);
		} else if (!startDate || !endDate) {
			return <>Please select the dates you want to book!</>;
		} else if (isAuthenticated && startDate && endDate) {
			return (
				<BookingPrice
					listing={listing}
					nights={differenceInCalendarDays(endDate, startDate)}
					onClick={handleBooking}
				/>
			);
		}
	};

	const handleBooking = async () => {
		const bookingData = {
			user: authState.user._id,
			listing: listing._id,
			startDate: startDate.toISOString(),
			endDate: endDate.toISOString(),
			totalPrice:
				listing.pricePerNight *
					differenceInCalendarDays(endDate, startDate) +
				listing.fees,
		};

		try {
			await createBooking(bookingData);
			navigate(`/users/${authState.user._id}/bookings`);
			toast.success("Booked!", {
				className: "toast toast-success",
			});
		} catch (err) {
			handleError(err, "Error booking listing");
		}
	};

	const [isLargeScreen, setIsLargeScreen] = useState(
		window.innerWidth >= 1500
	);

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1500 && !isLargeScreen) {
				setIsLargeScreen(true);
			} else if (window.innerWidth < 1500 && isLargeScreen) {
				setIsLargeScreen(false);
			}
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [isLargeScreen]);

	return (
		<div className="listing__booking-container">
			<DatePicker
				selectsRange
				startDate={startDate}
				endDate={endDate}
				onChange={handleDateSelection}
				minDate={new Date()}
				monthsShown={isLargeScreen ? 2 : 1}
				inline
				filterDate={filteredDates}
			/>

			<div className="listing__booking-text">{renderText()}</div>
		</div>
	);
}

export default BookingSection;
