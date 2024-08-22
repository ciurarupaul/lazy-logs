function Loader({ resource }) {
	return (
		<div className="page-container--center loader">
			<div className="loader-spinner" />
			<div className="loader-text">
				Loading {resource}, please wait ...
			</div>
		</div>
	);
}

export default Loader;
