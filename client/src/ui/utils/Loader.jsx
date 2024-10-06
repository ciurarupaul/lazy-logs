export function PageLoader({ children }) {
	return (
		<div className="page-container--center loader">
			<div className="loader-spinner" />
			<div className="loader-text">{`Loading ${children}...`}</div>
		</div>
	);
}

export function SidebarPageLoader({ children }) {
	return (
		<div className="loader loader--side">
			<div className="loader-spinner" />
			<div className="loader-text"> {`Loading ${children}...`}</div>
		</div>
	);
}

export function OnlyLoaderOnPage({ children }) {
	return (
		<div className="loader loader--only">
			<div className="loader-spinner" />
			<div className="loader-text"> {`Loading ${children}...`}</div>
		</div>
	);
}
