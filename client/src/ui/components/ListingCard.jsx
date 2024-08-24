import { useState } from "react";
import { PiHeartStraightFill } from "react-icons/pi";
import { AiFillStar } from "react-icons/ai";
import Carousel from "../utils/Carousel";
import { Link } from "react-router-dom";

// ---------------------------
// UPDATE WISHLIST STATE
// ---------------------------

function ListingCard({ listing }) {
	const [isStarred, setIsStarred] = useState(false);

	return (
		<Link to={`listings/${listing._id}`} className="listing">
			<div className="listing__photo">
				<Carousel images={listing.photos} />

				<PiHeartStraightFill
					className={`listing__photo-heart ${
						isStarred
							? "listing__photo-heart--full"
							: "listing__photo-heart--empty"
					}`}
					onClick={(event) => {
						event.stopPropagation();
						event.preventDefault();
						setIsStarred(!isStarred);
					}}
				/>
			</div>

			<div className="listing__details">
				<div className="listing__details-header">
					{listing.location.village ? (
						<p className="listing__details-location">
							{listing.location.village},{" "}
							{listing.location.county}
						</p>
					) : (
						<p>
							{listing.location.city}, {listing.location.county}
						</p>
					)}

					<p className="listing__details-rating">
						<AiFillStar className="listing__details-rating-icon" />
						{listing.ratingsAverage}
					</p>
				</div>

				<p className="listing__details-availability">
					Available as soon as **DATE**
				</p>

				<div className="small-margin" />

				<div className="listing__details-price">
					<p className="listing__details-price-start">
						Starting from
					</p>
					<span className="listing__details-price-value">
						{listing.pricePerNight} {listing.currency}
					</span>
				</div>
			</div>
		</Link>
	);
}

export default ListingCard;
