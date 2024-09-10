import React from "react";

const ListingField = React.memo(({ title, entries }) => {
	if (!entries || entries.length === 0) return null;

	return (
		<div className="listing__info__card">
			<div className="listing__info__card-container">
				<p className="listing__info__card-title">{title}</p>
				<ul className="listing__info__card-entries">
					{entries.map((entry, index) => (
						<li key={index} className="listing__info-card-entry">
							{entry}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
});

function PropertyDetails({ listing }) {
	return (
		<>
			<div className="listing__info-grid">
				{listing.rules ? (
					<ListingField title="House rules" entries={listing.rules} />
				) : null}
				{listing.security ? (
					<ListingField title="Security" entries={listing.security} />
				) : null}
				{listing.info ? (
					<ListingField
						title="Additional info"
						entries={listing.info}
					/>
				) : null}
			</div>
		</>
	);
}

export default PropertyDetails;
