import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_ERROR,
	CLEAR_MESSAGES,
} from '../actions/productActions';

const initialState = {
	allProductsData: [],
	allProductsLoading: false,
	allProductsMessage: '',
};

function product(state = initialState, action) {
	switch (action.type) {
		case ALL_PRODUCTS_REQUEST:
			return Object.assign({}, state, {
				allProductsData: [],
				allProductsLoading: true,
				allProductsMessage: '',
			});
		case ALL_PRODUCTS_SUCCESS:
			return Object.assign({}, state, {
				allProductsData: action.payload.data,
				allProductsLoading: false,
				allProductsMessage: '',
			});
		case ALL_PRODUCTS_ERROR:
			return Object.assign({}, state, {
				allProductsData: [],
				allProductsLoading: false,
				allProductsMessage: action.payload.message,
			});

		case CLEAR_MESSAGES:
			return {
				...initialState,
				allProductsMessage: '',
			};
		default:
			return state;
	}
}

export default product;
