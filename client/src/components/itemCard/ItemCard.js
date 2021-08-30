import { useState, useEffect } from 'react';
import './ItemCard.scss';

const ItemCard = ({ title, images, price, numOfReviews, ratings }) => {
	const [reviewCount, setReviewCount] = useState('');

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
							<i className='fa fa-star-o'></i>
							<i className='fa fa-star-o'></i>
							<i className='fa fa-star-o'></i>
							<i className='fa fa-star-o'></i>
							<i className='fa fa-star-o'></i>
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
