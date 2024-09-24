import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { getBookingsForUser } from "../services/apiBookings";
import { Loader } from "../ui/utils/Loader";
import BookingCard from "../ui/components/BookingCard";
import handleError from "../utils/handleError";

function Bookings() {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { authState } = useAuthContext([]);

	// will cache later

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const data = await getBookingsForUser(authState.user._id);
				setBookings(data);
			} catch (err) {
				handleError(err, "Failed to fetch bookings");
			} finally {
				setIsLoading(false);
			}
		};

		if (authState.user?._id) {
			fetchBookings();
		}
	}, [authState.user?._id]);

	if (authState.loading || isLoading) return <Loader>bookings</Loader>;

	return (
		<div className="bookings">
			<ul className="bookings__list">
				{bookings ? (
					bookings.map((booking) => (
						<li key={booking._id} className="bookings__list-item">
							<BookingCard booking={booking} />
						</li>
					))
				) : (
					<p>No bookings available</p>
				)}
			</ul>
		</div>
	);
}

export default Bookings;
