function ThemeButton({ onClick }) {
	return (
		<div className="theme">
			<input
				type="checkbox"
				id="toggle"
				className="theme-toggle-checkbox"
				onClick={onClick}
			/>
			<label htmlFor="toggle" className="theme-toggle-label">
				<span className="theme-toggle-button"></span>
			</label>
		</div>
	);
}

export default ThemeButton;
