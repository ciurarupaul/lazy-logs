import { memo, useEffect, useState } from "react";
import useListings from "../hooks/useListings";
import ListingCard from "../ui/components/ListingCard";
import Filters from "../ui/components/listings-page/Filters";
import Pagination from "../ui/components/listings-page/Pagination";
import Sorting from "../ui/components/listings-page/Sorting";
import { PageLoader as Loader } from "../ui/utils/Loader";

const ITEMS_PER_PAGE = 12;
const MemoizedListingCard = memo(ListingCard);

function Listings() {
	const [filters, setFilters] = useState({ guestRange: "all" });
	const [sortOption, setSortOption] = useState("popular");
	const [currentPage, setCurrentPage] = useState(1);

	const handleSortChange = (event) => {
		setSortOption(event.target.value);
	};

	const { filteredListings, loading } = useListings(filters, sortOption);

	useEffect(() => {
		setCurrentPage(1);
	}, [filters, sortOption]);

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedListings = filteredListings.slice(startIndex, endIndex);

	if (loading) return <Loader>properties</Loader>;

	return (
		<div className="page-container">
			<div className="listings__header">
				<Filters filters={filters} setFilters={setFilters} />
				<Sorting
					sortOption={sortOption}
					handleSortChange={handleSortChange}
				/>
			</div>

			<ul className="listings">
				{paginatedListings.length > 0 ? (
					paginatedListings.map((listing) => (
						<li key={listing._id} className="listings__cell">
							<MemoizedListingCard listing={listing} />
						</li>
					))
				) : (
					<p>No listings available</p>
				)}
			</ul>

			{filteredListings.length > ITEMS_PER_PAGE ? (
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					filteredListings={filteredListings}
					ITEMS_PER_PAGE={ITEMS_PER_PAGE}
				/>
			) : null}
		</div>
	);
}

export default Listings;
