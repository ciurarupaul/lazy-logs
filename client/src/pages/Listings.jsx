import { useEffect, useState } from "react";
import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import { getListings } from "../services/apiListings";
import ListingCard from "../ui/components/ListingCard";
import FilterButton from "../ui/utils/FilterButton";
import { PageLoader as Loader } from "../ui/utils/Loader";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";
const ITEMS_PER_PAGE = 12;

function Listings() {
	const [listings, setListings] = useState([]);
	const [filteredListings, setFilteredListings] = useState([]);
	const [filters, setFilters] = useState({ guestRange: "all" });
	const [sortOption, setSortOption] = useState("popular");
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	const handleSortChange = (event) => {
		setSortOption(event.target.value);
	};

	const calculateReviewsAverage = (reviews) => {
		if (!reviews || reviews.length === 0) return 0;

		const numberOfReviews = reviews.length;
		const totalRating = reviews.reduce(
			(sum, review) => sum + (review.rating || 0),
			0
		);
		const averageRating = totalRating / numberOfReviews;

		return Math.floor(averageRating * 10) / 10;
	};

	// only fetch data from db on mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getListings();
				console.log("fetched data");
				setListings(data.data.data);
				setFilteredListings(data.data.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		applyFiltersAndSorting();
	}, [filters, sortOption, listings]);

	const applyFiltersAndSorting = () => {
		let filtered = [...listings];
		setCurrentPage(1);

		// filter
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

		// sort
		if (sortOption === "popular") {
			filtered.sort((a, b) => b.reviews.length - a.reviews.length);
		} else if (sortOption === "priceAsc") {
			filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
		} else if (sortOption === "priceDesc") {
			filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
		} else if (sortOption === "ratingAsc") {
			filtered.sort(
				(a, b) =>
					calculateReviewsAverage(a.reviews) -
					calculateReviewsAverage(b.reviews)
			);
		} else if (sortOption === "ratingDesc") {
			filtered.sort(
				(a, b) =>
					calculateReviewsAverage(b.reviews) -
					calculateReviewsAverage(a.reviews)
			);
		}

		setFilteredListings(filtered);
	};

	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const paginatedListings = filteredListings.slice(startIndex, endIndex);

	if (loading) return <Loader>properties</Loader>;

	return (
		<div className="page-container">
			<div className="listings__header">
				<div className="listings__filters">
					<FilterButton
						label="No filter"
						filterType="guestRange"
						value="all"
						setFilters={setFilters}
						active={filters.guestRange === "all"}
					/>
					<FilterButton
						label={
							<>
								1-4{" "}
								<BsFillPersonFill className="listings__filters-button-icon" />
							</>
						}
						filterType="guestRange"
						value="1-4"
						setFilters={setFilters}
						active={filters.guestRange === "1-4"}
					/>
					<FilterButton
						label={
							<>
								5-15{" "}
								<BsFillPeopleFill className="listings__filters-button-icon" />
							</>
						}
						filterType="guestRange"
						value="5-15"
						setFilters={setFilters}
						active={filters.guestRange === "5-15"}
					/>
					<FilterButton
						label={
							<>
								16+{" "}
								<BsFillPeopleFill className="listings__filters-button-icon" />
								<BsFillPeopleFill className="listings__filters-button-icon listings__filters-button-icon-crowd" />
							</>
						}
						filterType="guestRange"
						value="16+"
						setFilters={setFilters}
						active={filters.guestRange === "16+"}
					/>
				</div>

				<div className="listings__sorting">
					<label htmlFor="sort">Sort by:</label>
					<select
						id="sort"
						value={sortOption}
						onChange={handleSortChange}
						className="listings__sorting-select"
					>
						<option
							value="popular"
							className="listings__sorting-select-option"
						>
							Most Popular
						</option>
						<option
							value="priceAsc"
							className="listings__sorting-select-option"
						>
							Price: Low to High
						</option>
						<option
							value="priceDesc"
							className="listings__sorting-select-option"
						>
							Price: High to Low
						</option>
						<option
							value="ratingAsc"
							className="listings__sorting-select-option"
						>
							Rating: Low to High
						</option>
						<option
							value="ratingDesc"
							className="listings__sorting-select-option"
						>
							Rating: High to Low
						</option>
					</select>
				</div>
			</div>

			<ul className="listings">
				{paginatedListings.length > 0 ? (
					paginatedListings.map((listing) => (
						<li key={listing._id} className="listings__cell">
							<ListingCard listing={listing} />
						</li>
					))
				) : (
					<p>No listings available</p>
				)}
			</ul>

			{filteredListings.length > ITEMS_PER_PAGE ? (
				<div className="listings__pagination">
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						className="listings__pagination-btn"
						disabled={currentPage === 1}
					>
						<MdOutlineKeyboardArrowLeft className="listings__pagination-btn-icon" />
						<p>Previous</p>
					</button>

					<p>
						<span>
							{endIndex > filteredListings.length
								? filteredListings.length
								: endIndex}
						</span>{" "}
						listings out of <span>{filteredListings.length}</span>
					</p>

					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						className="listings__pagination-btn"
						disabled={endIndex > filteredListings.length}
					>
						<p>Next</p>
						<MdOutlineKeyboardArrowRight className="listings__pagination-btn-icon" />
					</button>
				</div>
			) : null}
		</div>
	);
}

export default Listings;
