import './ItemCard.scss';

const ItemCard = () => {
	return (
		<div className='card'>
			<div className='card-image'>
				<figure className='image is-4by3'>
					<img
						src='https://bulma.io/images/placeholders/1280x960.png'
						alt='Item'
					/>
				</figure>
			</div>
			<div className='card-content'>
				<div className='content'>
					<a href='/'>128GB Solid Storage Memory Card - SanDisk Ultra</a>
				</div>
				<div className='media'>
					<div className='media-left'>
						<div className='ratings mt-auto'>
							<i className='fa fa-star'></i>
							<i className='fa fa-star'></i>
							<i className='fa fa-star'></i>
							<i className='fa fa-star-half-alt'></i>
							<i className='fa fa-star-o'></i>
							<span id='no_of_reviews'>(+999 Reviews)</span>
						</div>
					</div>
				</div>
				<div className='content'>
					<h3>$45.58</h3>
				</div>
			</div>
		</div>
	);
};

export default ItemCard;
