import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { FlagIcon } from "react-flag-kit";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getListing } from "../../api/apiListings";
import BookingSection from "../ui/components/listing-page/BookingSection";
import PropertyDetails from "../ui/components/listing-page/PropertyDetails";
import PropertyMap from "../ui/components/listing-page/PropertyMap";
import Carousel from "../ui/utils/Carousel";
import { PageLoader as Loader } from "../ui/utils/Loader";
import ReviewsCarousel from "../ui/utils/ReviewsCarousel";
import { calculateReviewsAverage } from "../utils/calcAverage";
import formatLabel from "../utils/formatLabel";
import handleError from "../utils/handleError";

function Listing() {
	const { listingId } = useParams();
	const queryClient = useQueryClient();

	// Check for cached data first
	const cachedListing = queryClient.getQueryData(["listing", listingId]);

	// If cached data is found, use it; otherwise, fetch from API
	const {
		data: listing = cachedListing,
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["listing", listingId],
		queryFn: () => getListing(listingId),
		enabled: !cachedListing,
		onError: (err) => handleError(err, "Failed to fetch listing"),
	});

	useEffect(() => {
		if (listing && listing.blockedDates) {
			refetch();
		}
	}, [listing?.blockedDates, refetch]);

	if (isLoading) return <Loader>property data</Loader>;

	if (!listing) return <ErrorPage />;

	return (
		<div className="page-container listing__grid">
			<div className="listing__grid-header">
				<Carousel
					images={listing.photos}
					photosClass="listing__carousel-photo"
					btnsClass="listing-btns"
					iconClass="listing-icon"
				/>

				<div className="listing__presentation">
					<div className="listing__presentation__details">
						<div className="listing__presentation__details-location">
							{listing.location.village ? (
								<p>
									<span>Located in</span>{" "}
									{listing.location.village},{" "}
									{listing.location.county}
								</p>
							) : (
								<p>
									<span>Located in</span>{" "}
									{listing.location.city},{" "}
									{listing.location.county}
								</p>
							)}
						</div>

						<div className="listing__presentation__details-capacity">
							{formatLabel(
								listing.listingDetails.maxGuests,
								"guest",
								"guests"
							)}{" "}
							&bull;{" "}
							{formatLabel(
								listing.listingDetails.rooms,
								"room",
								"rooms"
							)}{" "}
							&bull;{" "}
							{formatLabel(
								listing.listingDetails.beds,
								"bed",
								"beds"
							)}{" "}
							&bull;{" "}
							{formatLabel(
								listing.listingDetails.bathrooms,
								"bathroom",
								"bathrooms"
							)}
						</div>

						<div className="listing__presentation__host">
							<img
								src={listing.host.photo}
								alt="Profile picture of host"
								className="listing__presentation__host-pfp"
							/>
							<div className="listing__presentation__host-text">
								<p>Hosted by {listing.host.name}</p>
								<FlagIcon
									code={listing.host.countryCode}
									className="listing__presentation__host-flag"
								/>
							</div>
						</div>

						<div className="listing__presentation__details-description">
							{listing.description}
						</div>

						<div className="listing__presentation__amenities">
							<div className="listing__title listing__presentation__amenities-title">
								<p>Amenities</p>
								<div className="line" />
							</div>

							<ul className="listing__presentation__amenities-list">
								{listing.amenities.length > 0 ? (
									listing.amenities.map((amenity, index) => (
										<li
											key={index}
											className="listing__presentation__amenities-list-btn"
										>
											{amenity}
										</li>
									))
								) : (
									<li>
										The host didn't specify any amenities
									</li>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="listing__map">
				<div className="listing__title">
					<p>Location</p>
					<div className="line" />
				</div>

				<PropertyMap
					lat={listing.location.coordinates[1]}
					lng={listing.location.coordinates[0]}
				/>
			</div>

			<div className="listing__reviews">
				<div className="listing__title">
					<div className="listing__reviews-header">
						<p>Reviews</p>

						<div className="listing__reviews-header-score">
							<p>{calculateReviewsAverage(listing.reviews)}</p>
							<AiFillStar className="listing__reviews-header-icon" />
							<span>&bull; {listing.reviews.length} reviews</span>
						</div>
					</div>

					<div className="line" />
				</div>

				<ReviewsCarousel reviews={listing.reviews} />
			</div>

			{listing.rules || listing.security || listing.info ? (
				<div className="listing__info">
					<div className="listing__title">
						<p>You should know</p>
						<div className="line" />
					</div>

					<PropertyDetails listing={listing} />
				</div>
			) : null}

			<div className="listing__booking">
				<div className="listing__title">
					<p>Book your stay</p>
					<div className="line" />
				</div>

				<BookingSection listing={listing} />
			</div>
		</div>
	);
}

export default Listing;
