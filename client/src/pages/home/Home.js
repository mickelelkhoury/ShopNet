import { useEffect } from 'react';

// REDUX
import { connect } from 'react-redux';
import productActions from '../../redux/actions/productActions';

// COMPONENT
import MainTextHeader from '../../components/headers/MainTextHeader';
import ItemCard from '../../components/itemCard/ItemCard';
import MetaData from '../../components/layout/MetaData';

const Home = ({
	getAllProducts,
	allProductsData,
	allProductsLoading,
	allProductsMessage,
}) => {
	useEffect(() => {
		getAllProducts();
	}, []);

	console.log(allProductsData);

	return (
		<>
			<MetaData title='Buy Best Product Online' />
			<MainTextHeader title='latest products' />
			<section className='container py-6 px-6-mobile px-3'>
				<div className='columns is-flex is-flex-wrap-wrap'>
					{allProductsData?.products &&
						allProductsData?.products?.map((zone, i) => {
							return (
								<div
									key={i}
									className='column is-half-mobile is-one-quarter-tablet'
								>
									<ItemCard
										title={zone.name}
										images={zone.images}
										numOfReviews={zone.numOfReviews}
										ratings={zone.ratings}
										price={zone.price}
									/>
								</div>
							);
						})}
					{/* <div className='column is-half-mobile is-one-quarter-tablet'>
						<ItemCard />
					</div>
					<div className='column is-half-mobile is-one-quarter-tablet'>
						<ItemCard />
					</div>
					<div className='column is-half-mobile is-one-quarter-tablet'>
						<ItemCard />
					</div> */}
				</div>
			</section>
		</>
	);
};

const mapStateToProps = (state) => ({
	allProductsData: state.product.allProductsData,
	allProductsLoading: state.product.allProductsLoading,
	allProductsMessage: state.product.allProductsMessage,
});

const mapDispatchToProps = (dispatch) => ({
	getAllProducts: () => dispatch(productActions.getAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
