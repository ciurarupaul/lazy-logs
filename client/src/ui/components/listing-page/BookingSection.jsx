import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSameDay, isPast, addDays } from "date-fns"; // Assume you're using date-fns for these utilities

const bookedDates = [
	new Date(2024, 8, 12), // September 12, 2024
	new Date(2024, 8, 14), // September 14, 2024
	new Date(2024, 8, 20), // September 20, 2024
	new Date(2024, 8, 25), // September 25, 2024
];

const minBookingLength = 2; // Minimum 2 days
const maxBookingLength = 14; // Maximum 14 days

const BookingDatePicker = ({}) => {
	const [range, setRange] = useState([null, null]);
	const [startDate, endDate] = range;

	return (
		<DatePicker
			selectsRange
			startDate={startDate}
			endDate={endDate}
			onChange={(dates) => setRange(dates)}
			minDate={new Date()}
			// maxDate={addDays(new Date(), maxBookingLength)}
			// monthsShown={2}
			inline
			filterDate={(date) => {
				return (
					!isPast(date) &&
					!bookedDates.some((bookedDate) =>
						isSameDay(bookedDate, date)
					)
				);
			}}
		/>
	);
};

export default BookingDatePicker;
