import React from "react";

const ListingField = React.memo(({ title, entries }) => {
	if (!entries || entries.length === 0) return null;

	return (
		<div className="listing__info__card">
			<p className="listing__info__card-title">{title}</p>
			<ul className="listing__info__card-entries">
				{entries.map((entry, index) => (
					<li key={index} className="listing__info-card-entry">
						{entry}
					</li>
				))}
			</ul>
		</div>
	);
});

function PropertyDetails({ listing }) {
	return (
		<>
			{listing.rules || listing.security || listing.info ? (
				<div className="listing__info-grid">
					<ListingField title="House rules" entries={listing.rules} />
					<ListingField title="Security" entries={listing.security} />
					<ListingField
						title="Additional info"
						entries={listing.info}
					/>
				</div>
			) : null}
		</>
	);
}

export default PropertyDetails;
