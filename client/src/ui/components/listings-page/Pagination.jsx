import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function Pagination({
	currentPage,
	setCurrentPage,
	filteredListings,
	ITEMS_PER_PAGE,
}) {
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;

	return (
		<div className="listings__pagination">
			<button
				onClick={() => setCurrentPage(currentPage - 1)}
				className="listings__pagination-btn"
				disabled={currentPage === 1}
			>
				<MdOutlineKeyboardArrowLeft className="listings__pagination-btn-icon" />
				<p>Previous</p>
			</button>

			<p>
				<span>
					{endIndex > filteredListings.length
						? filteredListings.length
						: endIndex}
				</span>{" "}
				listings out of <span>{filteredListings.length}</span>
			</p>

			<button
				onClick={() => setCurrentPage(currentPage + 1)}
				className="listings__pagination-btn"
				disabled={endIndex > filteredListings.length}
			>
				<p>Next</p>
				<MdOutlineKeyboardArrowRight className="listings__pagination-btn-icon" />
			</button>
		</div>
	);
}

export default Pagination;
