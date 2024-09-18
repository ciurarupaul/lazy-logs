function Sorting({ sortOption, handleSortChange }) {
	return (
		<div className="listings__sorting">
			<label htmlFor="sort">Sort by:</label>
			<select
				id="sort"
				value={sortOption}
				onChange={handleSortChange}
				className="listings__sorting-select"
			>
				<option
					value="popular"
					className="listings__sorting-select-option"
				>
					Most Popular
				</option>
				<option
					value="priceAsc"
					className="listings__sorting-select-option"
				>
					Price: Low to High
				</option>
				<option
					value="priceDesc"
					className="listings__sorting-select-option"
				>
					Price: High to Low
				</option>
				<option
					value="ratingAsc"
					className="listings__sorting-select-option"
				>
					Rating: Low to High
				</option>
				<option
					value="ratingDesc"
					className="listings__sorting-select-option"
				>
					Rating: High to Low
				</option>
			</select>
		</div>
	);
}

export default Sorting;
