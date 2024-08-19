import { getListings } from "../services/apiListings";
import { useState, useEffect } from "react";
import ListingCard from "../ui/ListingCard";

function Listings() {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getListings();
				setListings(data.data.data);
				setLoading(false);
			} catch (err) {
				setError(err.message);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="page-container">
			<ul className="listings">
				{listings.length > 0 ? (
					listings.map((listing) => (
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
