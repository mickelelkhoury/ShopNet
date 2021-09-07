import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PrettyRating from 'pretty-rating-react';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

// REDUX
import { connect } from 'react-redux';
import productActions from '../../redux/actions/productActions';

// COMPONENTS
import Loading from '../../components/loading/Loading';
import MetaData from '../../components/layout/MetaData';

const icons = {
	star: {
		complete: faStar,
		half: faStarHalfAlt,
		empty: farStar,
	},
};

const colors = {
	star: ['#00d1b2', '#00d1b2', '#4a4a4a'],
};

const ProductDetails = ({
	getProductDetails,
	productDetailsData,
	productDetailsLoading,
	productDetailsMessage,
}) => {
	const params = useParams();

	const [reviewCount, setReviewCount] = useState('');
	const [newRating, setNewRating] = useState('');

	useEffect(() => {
		if (productDetailsData?.numOfReviews <= 0) {
			setReviewCount('No reviews');
		} else if (productDetailsData?.numOfReviews === 1) {
			setReviewCount(`${productDetailsData?.numOfReviews} Review`);
		} else if (
			productDetailsData?.numOfReviews > 1 &&
			productDetailsData?.numOfReviews < 100
		) {
			setReviewCount(`${productDetailsData?.numOfReviews} Reviews`);
		} else if (productDetailsData?.numOfReviews >= 100) {
			setReviewCount(`+99 Reviews`);
		}
	}, [productDetailsData?.numOfReviews]);

	console.log(productDetailsData);

	useEffect(() => {
		getProductDetails({ id: params.id });
	}, [params.id]);

	useEffect(() => {
		setNewRating(productDetailsData?.ratings / 2);
	}, [productDetailsData?.ratings]);

	return (
		<>
			{productDetailsLoading ? (
				<Loading />
			) : (
				<>
					<MetaData title='Buy Best Product Online' />
					<div className='columns is-8 is-variable'>
						<div className='column'>
							<div>
								<img
									src={
										productDetailsData?.images?.length > 0
											? productDetailsData?.images[0]?.url
											: 'https://bulma.io/images/placeholders/800x480.png'
									}
									className='image'
									alt={productDetailsData?.name}
								/>
							</div>
						</div>
						<div className='column'>
							<h1 className='has-text-primary is-size-2-tablet is-size-4-mobile has-text-weight-normal'>
								{productDetailsData?.name}
							</h1>
							<span>Product # dsduc89cy43cy12yd</span>
							<hr className='main-devider' />
							<div style={{ display: 'flex' }}>
								<PrettyRating
									value={newRating}
									icons={icons.star}
									colors={colors.star}
									max={5}
								/>
								<div style={{ marginLeft: '10px' }}>
									&#40;{reviewCount}&#41;
								</div>
							</div>
							<hr className='main-devider' />
							<h1 className='has-text-primary is-size-2-tablet is-size-4-mobile has-text-weight-normal'>
								${productDetailsData?.price}
							</h1>
						</div>
					</div>
				</>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	productDetailsData: state.product.productDetailsData,
	productDetailsLoading: state.product.productDetailsLoading,
	productDetailsMessage: state.product.productDetailsMessage,
});

const mapDispatchToProps = (dispatch) => ({
	getProductDetails: (data) => dispatch(productActions.getProductDetails(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
