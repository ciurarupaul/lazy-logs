import { getListing } from "../services/apiListings";
import { useEffect, useState } from "react";
import { PageLoader as Loader } from "../ui/utils/Loader";
import { useParams } from "react-router-dom";
import Carousel from "../ui/utils/Carousel";
import { AiFillStar } from "react-icons/ai";
import { FlagIcon } from "react-flag-kit";
import PropertyDetails from "../ui/components/listing-page/PropertyDetails";

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
				console.log(data);
				setListing(data);
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (isLoading) return <Loader>property data</Loader>;

	// too many grids?? once the google maps api is implemented, might allow all (except header with carousel and details) to fit on the whole width to simplify this..

	// must improve typography later !!! (and visual hierarchy, - lacks in some places)

	return (
		<div className="page-container listing__grid">
			<div className="listing__grid-header">
				<Carousel
					images={listing.photos}
					photosClass="listing__carousel-photo"
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

						<ul className="listing__presentation__amenities">
							<div className="listing__title listing__presentation__amenities-title">
								<p>Amenities</p>
								<div className="line" />
							</div>

							<div className="listing__presentation__amenities-list">
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
							</div>
						</ul>
					</div>
				</div>
			</div>

			<div className="listing__grid-mid">
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

						<p>**insert review card slider here**</p>
					</div>
				</div>

				<div>
					<div className="listing__title">
						<p>Location</p>
						<div className="line" />
					</div>

					<div className="listing__map"></div>
				</div>
			</div>

			<div className="listing__info">
				<div className="listing__title">
					<p>You should know</p>
					<div className="line" />
				</div>

				<PropertyDetails listing={listing} />
			</div>
		</div>
	);
}

export default Listing;
