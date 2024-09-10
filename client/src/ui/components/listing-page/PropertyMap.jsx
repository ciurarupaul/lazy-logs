import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

function PropertyMap({ lat, lng }) {
	const mapOptions = {
		styles: [
			{
				featureType: "landscape.natural",
				elementType: "geometry.fill",
				stylers: [
					{
						color: "#f5f5f2",
					},
					{
						visibility: "on",
					},
				],
			},
			{
				featureType: "administrative",
				stylers: [
					{
						visibility: "on",
					},
				],
			},
			{
				featureType: "transit",
				stylers: [
					{
						visibility: "on",
					},
				],
			},
			{
				featureType: "landscape.man_made",
				elementType: "geometry.fill",
				stylers: [
					{
						color: "#ffffff",
					},
					{
						visibility: "on",
					},
				],
			},
			{
				featureType: "poi.business",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "poi.medical",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "labels.icon",
				stylers: [
					{
						visibility: "on",
					},
				],
			},
			{
				featureType: "landscape",
				stylers: [
					{
						color: "#e5e8e7",
					},
				],
			},
			{
				featureType: "road",
				stylers: [
					{
						color: "#ffffff",
					},
				],
			},
			{
				featureType: "poi.sports_complex",
				elementType: "geometry",
				stylers: [
					{
						color: "#c7c7c7",
					},
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "water",
				stylers: [
					{
						color: "#a0d3d3",
					},
				],
			},
			{
				featureType: "poi.park",
				stylers: [
					{
						color: "#91b65d",
						gamma: 1.51,
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.fill",
				stylers: [
					{
						color: "#8ba129",
					},
				],
			},
			{
				featureType: "poi.park",
				elementType: "labels.text.stroke",
				stylers: [
					{
						color: "#ffffff",
					},
				],
			},

			{
				featureType: "road.local",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "road.local",
				elementType: "geometry",
				stylers: [
					{
						visibility: "on",
					},
				],
			},
			{
				featureType: "poi.government",
				elementType: "geometry",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "landscape",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "road",
				elementType: "labels",
				stylers: [
					{
						visibility: "off",
					},
				],
			},
			{
				featureType: "road.arterial",
				elementType: "geometry",
				stylers: [
					{
						visibility: "simplified",
					},
				],
			},
			{
				featureType: "road.local",
				stylers: [
					{
						visibility: "simplified",
					},
				],
			},
			{
				featureType: "road",
			},
			{
				featureType: "road",
			},
			{},
			{
				featureType: "road.highway",
			},
		],
		gestureHandling: "greedy",
		disableDefaultUI: true,
		scrollwheel: false,
	};

	return (
		<APIProvider apiKey="AIzaSyDAXbqzad6bf7xrCcwwuFypFUVslA-pqms">
			<div className="listing__map-container">
				<Map
					defaultCenter={{ lat: lat, lng: lng }}
					defaultZoom={12}
					options={mapOptions}
				>
					<Marker position={{ lat: lat, lng: lng }} />
				</Map>
			</div>
		</APIProvider>
	);
}

export default PropertyMap;
