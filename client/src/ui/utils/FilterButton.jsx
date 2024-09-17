function FilterButton({ label, filterType, value, setFilters, active }) {
	const handleClick = () => {
		setFilters((prevFilters) => ({
			...prevFilters,
			[filterType]: value,
		}));
	};

	return (
		<button
			onClick={handleClick}
			className={`listings__filters-button ${
				active ? "listings__filters-button--active" : ""
			}`}
		>
			{label}
		</button>
	);
}

export default FilterButton;
