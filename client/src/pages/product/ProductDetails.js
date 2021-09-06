import { useEffect } from 'react';

// REDUX
import { connect } from 'react-redux';
import productActions from '../../redux/actions/productActions';

const ProductDetails = ({
	productDetailsData,
	productDetailsLoading,
	productDetailsMessage,
}) => {
	return <div></div>;
};

const mapStateToProps = (state) => ({
	productDetailsData: state.product.productDetailsData,
	productDetailsLoading: state.product.productDetailsLoading,
	productDetailsMessage: state.product.productDetailsMessage,
});

const mapDispatchToProps = (dispatch) => ({
	getAllProducts: () => dispatch(productActions.getAllProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
