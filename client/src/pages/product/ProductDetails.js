import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import PrettyRating from 'pretty-rating-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faStar,
	faStarHalfAlt,
	faMinus,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { Carousel } from 'react-responsive-carousel';

// REDUX
import { connect } from 'react-redux';
import productActions from '../../redux/actions/productActions';

// COMPONENTS
import Loading from '../../components/loading/Loading';
import MetaData from '../../components/layout/MetaData';
import MainButton from '../../components/button/MainButton';
import ReviewModal from '../../components/reviewModal/ReviewModal';

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
	const [itemQuantity, setItemQuantity] = useState(1);
	const [removeBtnState, setRemoveBtnState] = useState(
		itemQuantity > 1 ? false : true
	);
	const [addBtnState, setAddBtnState] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

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

	useEffect(() => {
		getProductDetails({ id: params.id });
	}, [params.id]);

	useEffect(() => {
		setNewRating(productDetailsData?.ratings / 2);
	}, [productDetailsData?.ratings]);

	const handleRemoveQuant = () => {
		if (itemQuantity > 1) {
			setItemQuantity(itemQuantity - 1);
		} else {
			setRemoveBtnState(true);
		}
	};

	console.log(productDetailsData);

	const handleAddQuant = () => {
		setItemQuantity(itemQuantity + 1);
		if (itemQuantity >= 2) {
			setRemoveBtnState(false);
		}
	};

	return (
		<>
			{productDetailsLoading ? (
				<Loading />
			) : (
				<>
					<MetaData title={productDetailsData?.name} />
					<div className='columns is-8 is-variable'>
						<div className='column'>
							<Carousel showStatus={false} className='main-carousel'>
								{productDetailsData?.images?.length > 0 ? (
									productDetailsData?.images?.map((zone, i) => {
										return (
											<img
												key={i}
												src={zone.url}
												className='image'
												alt={zone.public_id}
											/>
										);
									})
								) : (
									<img
										src='https://bulma.io/images/placeholders/800x480.png'
										className='image'
										alt='brokenImage'
									/>
								)}
							</Carousel>
						</div>
						<div className='column'>
							<h1 className='has-text-primary is-size-2-tablet is-size-4-mobile has-text-weight-normal'>
								{productDetailsData?.name}
							</h1>
							<span>Product # {productDetailsData?._id}</span>
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
							<div
								style={{
									marginTop: '20px',
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<MainButton
									color='dark is-dark'
									icon={<FontAwesomeIcon icon={faMinus} />}
									btnWidth='30px'
									btnHeight='30px'
									btnFontSize='12px'
									handleClick={handleRemoveQuant}
									disabled={removeBtnState}
								/>
								<span style={{ margin: '0px 20px' }}>{itemQuantity}</span>
								<MainButton
									color='dark is-dark'
									icon={<FontAwesomeIcon icon={faPlus} />}
									btnWidth='30px'
									btnHeight='30px'
									btnFontSize='12px'
									handleClick={handleAddQuant}
									disabled={addBtnState}
								/>
								<MainButton
									color='is-primary'
									text='Add to Cart'
									btnWidth='max-content'
									btnHeight='40px'
									btnMargin='0px 20px'
									handleClick={handleAddQuant}
									disabled={addBtnState}
								/>
							</div>
							<hr className='main-devider' />
							<div>
								Status:{' '}
								{productDetailsData.stock > 0 ? (
									<span className='has-text-weight-bold'>In Stock</span>
								) : (
									<span className='has-text-weight-bold has-text-danger'>
										Out of Stock
									</span>
								)}
							</div>
							<hr className='main-devider' />
							<h1 className='has-text-primary is-size-4-tablet is-size-5-mobile has-text-weight-normal'>
								Description:
							</h1>
							<p>{productDetailsData?.description}</p>
							<hr className='main-devider' />
							<span>
								Sold by:{' '}
								<span className='has-text-weight-bold'>
									{productDetailsData?.seller}
								</span>
							</span>
							<br />
							<MainButton
								color='is-primary'
								text='Submit Your Review'
								btnWidth='max-content'
								btnHeight='40px'
								btnMargin='40px 0px 0px 0px'
								handleClick={() => setIsOpen(!isOpen)}
							/>
							<ReviewModal isOpen={isOpen} setIsOpen={setIsOpen} />
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
