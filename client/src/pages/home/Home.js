import { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faChevronLeft,
	faChevronRight,
	faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { Formik, Form } from 'formik';

// REDUX
import { connect } from 'react-redux';
import productActions from '../../redux/actions/productActions';

// COMPONENTS
import MainTextHeader from '../../components/headers/MainTextHeader';
import ItemCard from '../../components/itemCard/ItemCard';
import MetaData from '../../components/layout/MetaData';
import Loading from '../../components/loading/Loading';
import TextField from '../../components/Form/TextField';

const Home = ({
	getAllProducts,
	allProductsData,
	allProductsLoading,
	match,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [price, setPrice] = useState([1, 99999]);
	const [values, setValues] = useState({
		minPrice: '1',
		maxPrice: '99999',
	});

	const keyword = match.params.keyword;

	useEffect(() => {
		getAllProducts(currentPage, keyword, price);
	}, [currentPage, keyword, price]);

	const handleChangePage = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handlePriceFilter = (values) => {
		setPrice([values.minPrice, values.maxPrice]);
		setValues({
			minPrice: values.minPrice,
			maxPrice: values.maxPrice,
		});
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
						{keyword && (
							<>
								<div className=''>
									<Formik
										initialValues={values}
										onSubmit={handlePriceFilter}
										enableReinitialize={true}
									>
										{(formik) => (
											<Form style={{ display: 'flex', flexDirection: 'row' }}>
												<TextField
													name='minPrice'
													type='number'
													label='Minimum price'
													placeholder='minimum price'
													icon={<FontAwesomeIcon icon={faDollarSign} />}
												/>
												<TextField
													name='maxPrice'
													type='number'
													label='Maximum price'
													placeholder='maximum price'
													icon={<FontAwesomeIcon icon={faDollarSign} />}
													fieldStyle={{ marginLeft: '15px' }}
												/>
												<button
													type='submit'
													className='button is-primary'
													style={{
														alignSelf: 'flex-end',
														marginBottom: '12px',
														marginLeft: '15px',
													}}
												>
													Filter
												</button>
											</Form>
										)}
									</Formik>
								</div>
							</>
						)}
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
	getAllProducts: (currentPage, keyword, price) =>
		dispatch(productActions.getAllProducts(currentPage, keyword, price)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
