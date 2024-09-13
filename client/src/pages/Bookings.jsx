import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { getBookingsForUser } from "../services/apiBookings";
import { Loader } from "../ui/utils/Loader";
import BookingCard from "../ui/components/BookingCard";

function Bookings() {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { authState } = useAuthContext([]);
	const { user, loading } = authState;
	const id = user ? user._id : null;

	useEffect(() => {
		if (!loading) {
			const fetchBookings = async () => {
				try {
					const data = await getBookingsForUser(id);
					setBookings(data);
					setIsLoading(false);
				} catch (err) {
					setBookings([]);
					console.log("Error fetching bookings: ", err);
				} finally {
					setIsLoading(false);
				}
			};

			fetchBookings();
		}
	}, [loading, id]);

	if (loading || isLoading) return <Loader>bookings</Loader>;

	return (
		<div className="bookings">
			<ul className="bookings__booking">
				{bookings ? (
					bookings.map((booking) => (
						<li
							key={booking._id}
							className="bookings__booking-card"
						>
							<BookingCard />
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
