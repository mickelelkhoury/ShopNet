import { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = ({ history }) => {
	const [keyword, setKeyword] = useState('');

	const handleSearch = (e) => {
		e.preventDefault();

		if (keyword) {
			history.push(`/search/${keyword}`);
		} else {
			history.push('/');
		}
	};

	return (
		<form onSubmit={handleSearch}>
			<div className='navbar-item h-100'>
				<div className='field has-addons' id='nav__search'>
					<div className='control'>
						<input
							className='input is-primary'
							type='text'
							placeholder='Enter a product name...'
							onChange={(e) => setKeyword(e.target.value)}
						/>
					</div>
					<div className='control'>
						<button className='button is-primary' type='submit'>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</div>
				</div>
			</div>
		</form>
	);
};

const mapStateToProps = (state) => ({
	allProductsData: state.product.allProductsData,
	allProductsLoading: state.product.allProductsLoading,
	allProductsMessage: state.product.allProductsMessage,
});

const mapDispatchToProps = (dispatch) => ({
	// getAllProducts: (currentPage) =>
	// 	dispatch(productActions.getAllProducts(currentPage)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
