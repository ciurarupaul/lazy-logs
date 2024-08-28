export function PageLoader({ children }) {
	return (
		<div className="page-container--center loader">
			<div className="loader-spinner" />
			<div className="loader-text">{`Loading ${children}...`}</div>
		</div>
	);
}

export function Loader({ children }) {
	return (
		<div className="loader">
			<div className="loader-spinner" />
			<div className="loader-text"> {`Loading ${children}...`}</div>
		</div>
	);
}
