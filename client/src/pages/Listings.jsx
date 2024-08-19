import React, { useEffect, useState } from "react";

function Listings() {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("http://localhost:3000/api/listings")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setListings(data.data.data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div>
			<h1>Listings</h1>
			<ul>
				{Array.isArray(listings) && listings.length > 0 ? (
					listings.map((listing) => (
						<li key={listing._id}>
							<h2>{listing.location.city}</h2>
							<p>{listing.description}</p>
							<p>Price: {listing.pricePerNight} RON</p>
							<img src={listing.photos[0]} />
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
