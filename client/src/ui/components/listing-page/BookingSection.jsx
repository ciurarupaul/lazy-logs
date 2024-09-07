import {
	eachDayOfInterval,
	isPast,
	isSameDay,
	isWithinInterval,
	parseISO,
	differenceInCalendarDays,
} from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
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

const BookingDatePicker = ({ listing }) => {
	const { authState } = useAuthContext();
	const { isAuthenticated } = authState;
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
				<p className="listing__booking-text">
					Please{" "}
					<Link to="/login" className="listing__booking-text-link">
						login
					</Link>{" "}
					to book this property
				</p>
			);
		} else if (!startDate || !endDate) {
			return (
				<p className="listing__booking-text">
					Please select the dates you want to book!
				</p>
			);
		} else if (isAuthenticated && startDate && endDate) {
			return (
				<BookingPrice
					listing={listing}
					nights={differenceInCalendarDays(endDate, startDate)}
				/>
			);
		}
	};

	return (
		<div className="listing__booking-container">
			<div className="listing__booking-text">{renderText()}</div>
			<DatePicker
				selectsRange
				startDate={startDate}
				endDate={endDate}
				onChange={handleDateSelection}
				minDate={new Date()}
				monthsShown={2}
				inline
				filterDate={filteredDates}
			/>
		</div>
	);
};

export default BookingDatePicker;
