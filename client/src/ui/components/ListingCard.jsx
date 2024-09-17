import { addDays, format, isAfter } from "date-fns";
import { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { PiHeartStraightFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import Carousel from "../utils/Carousel";

function calculateReviewsAverage(reviews) {
	if (!reviews) return 0;

	const numberOfReviews = reviews.length;
	const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
	const averageRating = totalRating / numberOfReviews;

	return Math.floor(averageRating * 10) / 10;
}

function formatLabel(value, singular, plural) {
	return value > 1 ? `${value} ${plural}` : `1 ${singular}`;
}

function findFirstFreeDate(blockedDates) {
	const sortedBlockedDates = blockedDates.sort(
		(a, b) => new Date(a.startDate) - new Date(b.startDate)
	);

	const today = new Date();
	const tomorrow = addDays(today, 1);

	if (
		sortedBlockedDates.length === 0 ||
		isAfter(tomorrow, new Date(sortedBlockedDates[0].startDate))
	) {
		return "tomorrow";
	}

	for (let i = 0; i < sortedBlockedDates.length - 1; i++) {
		const currentEndDate = new Date(sortedBlockedDates[i].endDate);
		const nextStartDate = new Date(sortedBlockedDates[i + 1].startDate);

		if (isAfter(nextStartDate, addDays(currentEndDate, 1))) {
			const firstFreeDay = addDays(currentEndDate, 1);
			if (isAfter(firstFreeDay, tomorrow)) {
				return format(firstFreeDay, "dd.MM");
			} else {
				return "tomorrow";
			}
		}
	}

	const lastEndDate = new Date(
		sortedBlockedDates[sortedBlockedDates.length - 1].endDate
	);
	const firstFreeDayAfterLastBlocked = addDays(lastEndDate, 1);
	if (isAfter(firstFreeDayAfterLastBlocked, tomorrow)) {
		return format(firstFreeDayAfterLastBlocked, "dd.MM");
	} else {
		return "tomorrow";
	}
}

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
}

export default ListingCard;
