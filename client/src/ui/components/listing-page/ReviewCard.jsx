import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { parseISO, format } from "date-fns";

function ReviewCard({ review }) {
	const date = review.createdAt;
	const month = format(date, "MMMM");
	const year = format(date, "yyyy");

	return (
		<div className="review-card">
			<div className="review-card__header">
				<img
					src={review.user.photo}
					alt="User profile picture"
					className="review-card__header-pfp"
				/>

				<div className="review-card__header-container">
					<div className="review-card__header-name">
						{review.user.name}
					</div>
					<div className="review-card__header-text">
						<div className="review-card__header-stars">
							{Array.from({ length: 5 }, (_, index) => {
								return index < review.rating ? (
									<AiFillStar
										key={index}
										className="review-card-star"
									/>
								) : (
									<AiOutlineStar
										key={index}
										className="review-card-star"
									/>
								);
							})}
						</div>
						<p>&bull;</p>
						<div>
							{month} {year}
						</div>
					</div>
				</div>
			</div>
			<div className="review-card-comment">{review.comment}</div>
		</div>
	);
}

export default ReviewCard;
