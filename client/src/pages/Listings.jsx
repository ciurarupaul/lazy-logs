import { getListings } from "../services/apiListings";
import { useState, useEffect } from "react";
import ListingCard from "../ui/components/ListingCard";
import { PageLoader as Loader } from "../ui/utils/Loader";

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

		console.log(listings);
		fetchData();
	}, []);

	if (loading) return <Loader>properties</Loader>;

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
