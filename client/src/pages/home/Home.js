import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

// REDUX
import { connect } from 'react-redux';
import productActions from '../../redux/actions/productActions';

// COMPONENT
import MainTextHeader from '../../components/headers/MainTextHeader';
import ItemCard from '../../components/itemCard/ItemCard';
import MetaData from '../../components/layout/MetaData';
import Loading from '../../components/loading/Loading';

const Home = ({ getAllProducts, allProductsData, allProductsLoading }) => {
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getAllProducts(currentPage);
	}, [currentPage]);

	const handleChangePage = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	return (
		<>
			{allProductsLoading ? (
				<Loading />
			) : (
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
												id={zone._id}
												title={zone.name}
												images={zone.images}
												numOfReviews={zone.numOfReviews}
												ratings={zone.ratings}
												price={zone.price}
											/>
										</div>
									);
								})}
						</div>
					</section>

					{allProductsData?.resPerPage <= allProductsData?.productsCount && (
						<div className='is-flex is-justify-content-center'>
							<Pagination
								itemClass='pag-item'
								linkClass='pag-link'
								activePage={currentPage}
								activeClass='pag-active-item'
								itemsCountPerPage={allProductsData?.resPerPage}
								totalItemsCount={allProductsData?.productsCount || 0}
								onChange={handleChangePage}
								hideFirstLastPages={true}
								prevPageText={<FontAwesomeIcon icon={faChevronLeft} />}
								nextPageText={<FontAwesomeIcon icon={faChevronRight} />}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
};

const mapStateToProps = (state) => ({
	allProductsData: state.product.allProductsData,
	allProductsLoading: state.product.allProductsLoading,
	allProductsMessage: state.product.allProductsMessage,
});

const mapDispatchToProps = (dispatch) => ({
	getAllProducts: (currentPage) =>
		dispatch(productActions.getAllProducts(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
