import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cancelBooking, getBookingsForUser } from "../../api/apiBookings";
import { useAuthContext } from "../context/authContext";
import BookingCard from "../ui/components/BookingCard";
import { Loader } from "../ui/utils/Loader";
import handleError from "../utils/handleError";

function Bookings() {
	const {
		authState: { user },
	} = useAuthContext();
	const queryClient = useQueryClient();

	const { data: bookings, isLoading: bookingsLoading } = useQuery({
		queryKey: ["bookings", user?._id],
		queryFn: () => user && getBookingsForUser(user._id),
		enabled: !!user?._id,
		cacheTime: 10 * 60 * 1000,
		onError: (error) => handleError(error, "Error fetching the bookings"),
	});

	const { mutate: cancelBookingMutate } = useMutation({
		// await the db operation so the optimistic ui can be true
		mutationFn: async (bookingId) => await cancelBooking(bookingId),

		// Optimistic UI update
		onMutate: async (bookingId) => {
			await queryClient.cancelQueries(["bookings", user?._id]);

			const previousBookings = queryClient.getQueryData([
				"bookings",
				user?._id,
			]);

			queryClient.setQueryData(
				["bookings", user?._id],
				(oldBookings = []) =>
					oldBookings.filter((booking) => booking._id !== bookingId)
			);

			return { previousBookings };
		},

		// On error, go back to the previous cache
		onError: (error, context) => {
			queryClient.setQueryData(
				["bookings", user?._id],
				context.previousBookings
			);
			handleError(error, "Failed to cancel booking");
		},

		// On success, refetch bookings and show success message
		onSuccess: () => {
			queryClient.invalidateQueries(["bookings", user?._id]);
			toast.success("Booking canceled!", {
				className: "toast toast-success",
			});
		},
	});

	const handleCancelBooking = (bookingId) => {
		cancelBookingMutate(bookingId);
	};

	if (bookingsLoading) return <Loader>Loading bookings...</Loader>;

	return (
		<div className="bookings">
			<ul className="bookings__list">
				{bookings && bookings.length > 0 ? (
					bookings.map((booking) => (
						<li key={booking._id} className="bookings__list-item">
							<BookingCard
								booking={booking}
								onCancel={handleCancelBooking}
							/>
						</li>
					))
				) : (
					<p className="empty-fallback">No bookings available</p>
				)}
			</ul>
		</div>
	);
}

export default Bookings;
