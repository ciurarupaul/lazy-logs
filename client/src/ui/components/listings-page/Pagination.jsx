import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";

function Pagination({ currentPage, setCurrentPage, totalItems, itemsPerPage }) {
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

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
				<span>{endIndex > totalItems ? totalItems : endIndex}</span>{" "}
				listings out of <span>{totalItems}</span>
			</p>

			<button
				onClick={() => setCurrentPage(currentPage + 1)}
				className="listings__pagination-btn"
				disabled={endIndex >= totalItems}
			>
				<p>Next</p>
				<MdOutlineKeyboardArrowRight className="listings__pagination-btn-icon" />
			</button>
		</div>
	);
}

export default Pagination;
