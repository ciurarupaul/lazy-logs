import { useEffect, useState } from "react";
import { getListings } from "../services/apiListings";
import ListingCard from "../ui/components/ListingCard";
import FilterButton from "../ui/utils/FilterButton";
import { PageLoader as Loader } from "../ui/utils/Loader";

function Listings() {
	const [listings, setListings] = useState([]);
	const [filteredListings, setFilteredListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filters, setFilters] = useState({ guestRange: "all" });

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getListings();
				setListings(data.data.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		applyFilters();
	}, [filters, listings]);

	const applyFilters = () => {
		if (!listings) return;

		let filtered = listings;

		if (filters.guestRange && filters.guestRange !== "all") {
			if (filters.guestRange === "1-4") {
				filtered = filtered.filter(
					(listing) =>
						listing.listingDetails.maxGuests >= 1 &&
						listing.listingDetails.maxGuests <= 4
				);
			} else if (filters.guestRange === "5-15") {
				filtered = filtered.filter(
					(listing) =>
						listing.listingDetails.maxGuests >= 5 &&
						listing.listingDetails.maxGuests <= 15
				);
			} else if (filters.guestRange === "16+") {
				filtered = filtered.filter(
					(listing) => listing.listingDetails.maxGuests >= 16
				);
			}
		}

		setFilteredListings(filtered);
	};

	if (loading) return <Loader>properties</Loader>;

	return (
		<div className="page-container">
			<div className="listings__filters">
				<FilterButton
					label="No filter"
					filterType="guestRange"
					value="all"
					setFilters={setFilters}
					active={filters.guestRange === "all"}
				/>
				<FilterButton
					label="1-4 Guests"
					filterType="guestRange"
					value="1-4"
					setFilters={setFilters}
					active={filters.guestRange === "1-4"}
				/>
				<FilterButton
					label="5-15 Guests"
					filterType="guestRange"
					value="5-15"
					setFilters={setFilters}
					active={filters.guestRange === "5-15"}
				/>
				<FilterButton
					label="16+ Guests"
					filterType="guestRange"
					value="16+"
					setFilters={setFilters}
					active={filters.guestRange === "16+"}
				/>
			</div>
			<ul className="listings">
				{filteredListings.length > 0 ? (
					filteredListings.map((listing) => (
						<li key={listing._id} className="listings__cell">
							<ListingCard listing={listing} />
						</li>
					))
				) : (
					<p>No listings available</p>
				)}
			</ul>
		</div>
	);
}

export default Listings;
