import { useQueries, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { useWishlistContext } from "../context/wishlistContext";
import { getListing } from "../../api/apiListings";
import ListingCard from "../ui/components/ListingCard";
import { SidebarPageLoader as Loader } from "../ui/utils/Loader";

const MemoizedListingCard = memo(ListingCard);

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

	return (
		<>
			{allListings.length > 0 ? (
				<ul className="listings">
					{allListings.map((listing) => (
						<li key={listing._id} className="listings__cell">
							<MemoizedListingCard
								listing={listing}
								isInWishlist={() =>
									wishlist.includes(listing._id)
								}
							/>
						</li>
					))}
				</ul>
			) : (
				<p className="empty-fallback">
					Looks like you didn't like anything yet
				</p>
			)}
		</>
	);
}

export default Wishlist;
