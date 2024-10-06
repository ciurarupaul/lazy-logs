import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReviewCard from "../components/listing-page/ReviewCard";

function ReviewsCarousel({ reviews }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [visibleReviewsCount, setVisibleReviewsCount] = useState(3);

	const nextSlide = () => {
		setActiveIndex((prevIndex) =>
			prevIndex < reviews.length - visibleReviewsCount
				? prevIndex + 1
				: prevIndex
		);
	};

	const prevSlide = () => {
		setActiveIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : prevIndex
		);
	};

	const handleResize = () => {
		const width = window.innerWidth;
		if (width < 1200) {
			setVisibleReviewsCount(1);
		} else if (width < 1500) {
			setVisibleReviewsCount(2);
		} else {
			setVisibleReviewsCount(3);
		}
	};

	useEffect(() => {
		handleResize();

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="reviews-carousel">
			{activeIndex > 0 && (
				<button
					onClick={(event) => {
						event.stopPropagation();
						event.preventDefault();
						prevSlide();
					}}
					className="reviews-carousel__btn reviews-carousel__btn--prev"
				>
					<HiChevronLeft className="reviews-carousel__btn-icon" />
				</button>
			)}
			<div className="reviews-carousel__content">
				{reviews
					.slice(activeIndex, activeIndex + visibleReviewsCount)
					.map((review, index) => (
						<ReviewCard review={review} key={index} />
					))}
			</div>
			{activeIndex < reviews.length - visibleReviewsCount && (
				<button
					onClick={(event) => {
						event.stopPropagation();
						event.preventDefault();
						nextSlide();
					}}
					className="reviews-carousel__btn reviews-carousel__btn--next"
				>
					<HiChevronRight className="reviews-carousel__btn-icon" />
				</button>
			)}
		</div>
	);
}

export default ReviewsCarousel;
