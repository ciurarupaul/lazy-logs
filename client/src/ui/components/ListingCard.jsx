import { useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { PiHeartStraightFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import { useWishlistContext } from "../../context/wishlistContext";
import { calculateReviewsAverage } from "../../utils/calcAverage";
import findFirstFreeDate from "../../utils/findFirstFreeDate";
import formatLabel from "../../utils/formatLabel";
import Carousel from "../utils/Carousel";

const ListingCard = ({ listing, isInWishlist }) => {
	const { wishlist, addToWishlist, removeFromWishlist } =
		useWishlistContext();
	const { authState } = useAuthContext();
	const [isStarred, setIsStarred] = useState(isInWishlist);

	const handleWishlistToggle = (event) => {
		event.stopPropagation();
		event.preventDefault();
		if (isStarred) {
			removeFromWishlist(listing._id);
		} else {
			addToWishlist(listing._id);
			console.log(listing._id, "wishlist mutated: ", wishlist);
		}
		setIsStarred(!isStarred);
	};

	return (
		<Link to={`/listings/${listing._id}`} className="listing">
			<div className="listing__photo">
				<Carousel images={listing.photos} />

				{authState.user ? (
					<PiHeartStraightFill
						className={`listing__photo-heart ${
							isStarred
								? "listing__photo-heart--full"
								: "listing__photo-heart--empty"
						}`}
						onClick={handleWishlistToggle}
					/>
				) : null}
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
					{listing.reviews.length ? (
						<p className="listing__details-rating">
							{calculateReviewsAverage(listing.reviews)}
							<AiFillStar className="listing__details-rating-icon" />
							<span>
								&bull;{" "}
								{formatLabel(
									listing.reviews.length,
									"review",
									"reviews"
								)}
							</span>
						</p>
					) : null}
				</div>

				<div className="listing__small-margin" />

				<div className="listing__details-capacity">
					{formatLabel(
						listing.listingDetails.maxGuests,
						"guest",
						"guests"
					)}{" "}
					&bull;{" "}
					{formatLabel(listing.listingDetails.beds, "bed", "beds")}{" "}
					&bull;{" "}
					{formatLabel(
						listing.listingDetails.bathrooms,
						"bathroom",
						"bathrooms"
					)}
				</div>

				<div className="listing__details-availability">
					Available as soon as{" "}
					<span>{findFirstFreeDate(listing.blockedDates)}</span>
				</div>

				<div className="listing__small-margin" />

				<div className="listing__details-price">
					<span className="listing__details-price-value">
						{Math.floor(listing.pricePerNight * 10) / 10}&euro;
					</span>
					<p className="listing__details-price-end">/night</p>
				</div>
			</div>
		</Link>
	);
};

export default ListingCard;
