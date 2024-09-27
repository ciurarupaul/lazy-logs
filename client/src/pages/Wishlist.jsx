import { useWishlistContext } from "../context/wishlistContext";
import ListingCard from "../ui/components/ListingCard";
import { useQueryClient, useQueries } from "@tanstack/react-query";
import { Loader } from "../ui/utils/Loader";
import { getListing } from "../services/apiListings";

function Wishlist() {
	const { wishlist } = useWishlistContext();
	const queryClient = useQueryClient();

	const cachedListings = wishlist
		.map((listingId) => queryClient.getQueryData(["listing", listingId]))
		.filter(Boolean);

	const listingsQueries = useQueries({
		queries: wishlist
			.filter(
				(listingId) => !queryClient.getQueryData(["listing", listingId])
			)
			.map((listingId) => ({
				queryKey: ["listing", listingId],
				queryFn: () => getListing(listingId),
				staleTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false,
			})),
	});

	const isLoading = listingsQueries.some((query) => query.isLoading);

	const fetchedListings = listingsQueries
		.filter((query) => query.data)
		.map((query) => query.data);

	const allListings = [...cachedListings, ...fetchedListings];

	if (isLoading) {
		return <Loader>Loading your wishlist...</Loader>;
	}

	if (allListings.length === 0) {
		return <p>Looks like you don't have aynthing here yet</p>;
	}

	return (
		<ul className="listings">
			{allListings.map((listing) => (
				<li key={listing._id} className="listings__cell">
					<ListingCard listing={listing} />
				</li>
			))}
		</ul>
	);
}

export default Wishlist;
