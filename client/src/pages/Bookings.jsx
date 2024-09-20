import { useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import { getBookingsForUser } from "../services/apiBookings";
import { Loader } from "../ui/utils/Loader";
import BookingCard from "../ui/components/BookingCard";

function Bookings() {
	const [bookings, setBookings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const { authState } = useAuthContext([]);

	useEffect(() => {
		if (!authState.loading) {
			const fetchBookings = async () => {
				try {
					const data = await getBookingsForUser(authState.user._id);
					setBookings(data);
				} catch (err) {
					console.log(err.message);
					toast.error("Failed to fetch bookings.", {
						className: "toast toast-error",
					});
				} finally {
					setIsLoading(false);
				}
			};

			fetchBookings();
		}
	}, [authState.loading, authState.user?._id, bookings]);

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
