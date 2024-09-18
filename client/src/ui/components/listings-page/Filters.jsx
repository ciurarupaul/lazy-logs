import { BsFillPeopleFill, BsFillPersonFill } from "react-icons/bs";
import FilterButton from "../../utils/FilterButton";

function Filters({ filters, setFilters }) {
	return (
		<div className="listings__filters">
			<FilterButton
				label="No filter"
				filterType="guestRange"
				value="all"
				setFilters={setFilters}
				active={filters.guestRange === "all"}
			/>
			<FilterButton
				label={
					<>
						1-4{" "}
						<BsFillPersonFill className="listings__filters-button-icon" />
					</>
				}
				filterType="guestRange"
				value="1-4"
				setFilters={setFilters}
				active={filters.guestRange === "1-4"}
			/>
			<FilterButton
				label={
					<>
						5-15{" "}
						<BsFillPeopleFill className="listings__filters-button-icon" />
					</>
				}
				filterType="guestRange"
				value="5-15"
				setFilters={setFilters}
				active={filters.guestRange === "5-15"}
			/>
			<FilterButton
				label={
					<>
						16+{" "}
						<BsFillPeopleFill className="listings__filters-button-icon" />
						<BsFillPeopleFill className="listings__filters-button-icon listings__filters-button-icon-crowd" />
					</>
				}
				filterType="guestRange"
				value="16+"
				setFilters={setFilters}
				active={filters.guestRange === "16+"}
			/>
		</div>
	);
}

export default Filters;
