import { useEffect, useState } from "react";
import { FlagIcon } from "react-flag-kit";
import { AiFillStar } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getListing } from "../services/apiListings";
import BookingSection from "../ui/components/listing-page/BookingSection";
import PropertyDetails from "../ui/components/listing-page/PropertyDetails";
import PropertyMap from "../ui/components/listing-page/PropertyMap";
import Carousel from "../ui/utils/Carousel";
import { PageLoader as Loader } from "../ui/utils/Loader";
import ReviewsCarousel from "../ui/utils/ReviewsCarousel";

function Listing() {
	const [listing, setListing] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const { listingId } = useParams();

	function formatLabel(value, singular, plural) {
		return value > 1 ? `${value} ${plural}` : `1 ${singular}`;
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getListing(listingId);
				setListing(data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) return <Loader>property data</Loader>;

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
							<p>{listing.ratingsAverage}</p>
							<AiFillStar className="listing__reviews-header-icon" />
							<span>
								&bull; {listing.ratingsQuantity} reviews
							</span>
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
