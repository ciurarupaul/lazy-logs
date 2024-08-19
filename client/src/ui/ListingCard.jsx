function ListingCard({ listing }) {
	return (
		<div className="listing">
			<img
				src={listing.photos[0]}
				alt="listing presentation photo"
				className="listing__photo"
			/>
			<div>
				{listing.location.village ? (
					<p>
						{listing.location.county}, {listing.location.village}
					</p>
				) : (
					<p>
						{listing.location.county}, {listing.location.city}
					</p>
				)}

				<p>
					{listing.ratingsAverage} &#x2022; {listing.ratingsQuantity}{" "}
					reviews
				</p>
				<p>
					{listing.pricePerNight} {listing.currency}/night
				</p>
				<p>available as soon as DATE</p>
			</div>
		</div>
	);
}

export default ListingCard;
