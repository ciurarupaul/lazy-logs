import { memo, useEffect, useState } from "react";
import { useAuthContext } from "../context/authContext";
import useListings from "../hooks/useListings";
import ListingCard from "../ui/components/ListingCard";
import Filters from "../ui/components/listings-page/Filters";
import Pagination from "../ui/components/listings-page/Pagination";
import Sorting from "../ui/components/listings-page/Sorting";
import { PageLoader as Loader } from "../ui/utils/Loader";
import { useWishlistContext } from "../context/wishlistContext";

const ITEMS_PER_PAGE = 12;
const MemoizedListingCard = memo(ListingCard);

function Listings() {
	const [filters, setFilters] = useState({ guestRange: "all" });
	const [sortOption, setSortOption] = useState("popular");
	const [currentPage, setCurrentPage] = useState(1);
	const { authState } = useAuthContext();
	const { wishlist, addToWishlist, removeFromWishlist } =
		useWishlistContext();

	const handleSortChange = (event) => {
		setSortOption(event.target.value);
	};

	const { filteredListings, isLoading, totalFilteredListings } = useListings(
		filters,
		sortOption,
		currentPage,
		ITEMS_PER_PAGE
	);

	useEffect(() => {
		setCurrentPage(1);
	}, [filters, sortOption]);

	if (isLoading || !!authState.loading) {
		return <Loader>properties</Loader>;
	}

	return (
		<div className="page-container">
			<header className="listings__header">
				<Filters filters={filters} setFilters={setFilters} />
				<Sorting
					sortOption={sortOption}
					handleSortChange={handleSortChange}
				/>
			</header>

			<main>
				<ul className="listings">
					{filteredListings.length > 0 ? (
						filteredListings.map((listing) => (
							<li key={listing._id} className="listings__cell">
								<MemoizedListingCard
									listing={listing}
									wishlist={wishlist}
									addToWishlist={addToWishlist}
									removeFromWishlist={removeFromWishlist}
								/>
							</li>
						))
					) : (
						<p>No listings available</p>
					)}
				</ul>
			</main>

			<footer>
				{totalFilteredListings > ITEMS_PER_PAGE ? (
					<Pagination
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
						totalItems={totalFilteredListings}
						itemsPerPage={ITEMS_PER_PAGE}
					/>
				) : null}
			</footer>
		</div>
	);
}

export default Listings;
