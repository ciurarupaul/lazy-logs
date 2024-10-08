function BookingPrice({ listing, nights, onClick }) {
	const pricePerNight = listing.pricePerNight || 0;
	const fees = listing.fees || 0;
	const total = pricePerNight * nights + fees;

	return (
		<div className="listing__booking__summary">
			<div className="listing__booking__summary-header">
				Prices summary
			</div>

			<div className="listing__booking__summary-row">
				<p>
					{pricePerNight}&euro; x {nights}{" "}
					{nights === 1 ? "night" : "nights"}
				</p>
				<p>{pricePerNight * nights}&euro;</p>
			</div>

			<div className="listing__booking__summary-row">
				<p>Property fees</p>
				<p>{listing.fees}&euro;</p>
			</div>

			<div className="line listing__booking__summary-line" />

			<div className="listing__booking__summary-row listing__booking__summary-total">
				<p>Total</p>
				<p>{total}&euro;</p>
			</div>

			<button className="listing__booking__summary-btn" onClick={onClick}>
				Book now
			</button>
		</div>
	);
}

export default BookingPrice;
