function Loader({ children }) {
	return (
		<div className="page-container--center loader">
			<div className="loader-spinner" />
			<div className="loader-text">{children}</div>
		</div>
	);
}

export default Loader;
