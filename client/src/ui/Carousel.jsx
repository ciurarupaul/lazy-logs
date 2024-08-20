import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import { HiChevronLeft } from "react-icons/hi";

function Carousel({ images }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const nextSlide = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};
	const prevSlide = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className="carousel">
			{activeIndex > 1 ? (
				<button
					onClick={prevSlide}
					className="carousel__btn carousel__btn--prev"
				>
					<HiChevronLeft className="carousel__btn-icon" />
				</button>
			) : null}
			<img
				src={images[activeIndex]}
				alt={`Slide ${activeIndex}`}
				className="carousel__photo"
			/>
			{activeIndex < images.length - 1 ? (
				<button
					onClick={nextSlide}
					className="carousel__btn carousel__btn--next"
				>
					<HiChevronRight className="carousel__btn-icon" />
				</button>
			) : null}
		</div>
	);
}

export default Carousel;
