import { useState, useEffect } from 'react';
import PrettyRating from 'pretty-rating-react';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// SCSS
import './ItemCard.scss';

const icons = {
	star: {
		complete: faStar,
		half: faStarHalfAlt,
		empty: farStar,
	},
};

const colors = {
	star: ['#4a4a4a', '#4a4a4a', '#4a4a4a'],
};

const ItemCard = ({ title, images, price, numOfReviews, ratings }) => {
	const [reviewCount, setReviewCount] = useState('');
	const [newRating, setNewRating] = useState('');

	useEffect(() => {
		if (numOfReviews <= 0) {
			setReviewCount('No reviews');
		} else if (numOfReviews === 1) {
			setReviewCount(`${numOfReviews} Review`);
		} else if (numOfReviews > 1 && numOfReviews < 100) {
			setReviewCount(`${numOfReviews} Reviews`);
		} else if (numOfReviews >= 100) {
			setReviewCount(`+99 Reviews`);
		}
	}, [numOfReviews]);

	useEffect(() => {
		setNewRating(ratings / 2);
	}, [ratings]);

	return (
		<div className='card item-main-card'>
			<div className='card-image'>
				<figure className='image is-4by3'>
					{images[0] ? (
						<img src={images[0].url} alt={title} />
					) : (
						<img
							src='https://bulma.io/images/placeholders/1280x960.png'
							alt='Item'
						/>
					)}
				</figure>
			</div>
			<div className='card-content'>
				<div className='content'>
					<a href='/' className='cardLink'>
						{title}
					</a>
				</div>
				<div className='media'>
					<div className='media-left'>
						<div className='ratings mt-auto'>
							<PrettyRating
								value={newRating}
								icons={icons.star}
								colors={colors.star}
								max={5}
							/>
						</div>
						<span id='no_of_reviews'>&#40;{reviewCount}&#41;</span>
					</div>
				</div>
				<div className='content'>
					<h3>${price}</h3>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
