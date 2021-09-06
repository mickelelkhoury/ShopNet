import {
	ALL_PRODUCTS_REQUEST,
	ALL_PRODUCTS_SUCCESS,
	ALL_PRODUCTS_ERROR,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_ERROR,
	CLEAR_MESSAGES,
} from '../actions/productActions';

const initialState = {
	allProductsData: [],
	allProductsLoading: false,
	allProductsMessage: ['', ''],

	productDetailsData: [],
	productDetailsLoading: false,
	productDetailsMessage: ['', ''],
};

function product(state = initialState, action) {
	switch (action.type) {
		case ALL_PRODUCTS_REQUEST:
			return Object.assign({}, state, {
				allProductsData: [],
				allProductsLoading: true,
				allProductsMessage: ['', ''],
			});
		case ALL_PRODUCTS_SUCCESS:
			return Object.assign({}, state, {
				allProductsData: action.payload.data,
				allProductsLoading: false,
				allProductsMessage: ['', action.payload.message],
			});
		case ALL_PRODUCTS_ERROR:
			return Object.assign({}, state, {
				allProductsData: [],
				allProductsLoading: false,
				allProductsMessage: [action.payload.message, ''],
			});

		case PRODUCT_DETAILS_REQUEST:
			return Object.assign({}, state, {
				productDetailsData: [],
				productDetailsLoading: true,
				productDetailsMessage: ['', ''],
			});
		case PRODUCT_DETAILS_SUCCESS:
			return Object.assign({}, state, {
				productDetailsData: action.payload.data,
				productDetailsLoading: false,
				productDetailsMessage: ['', action.payload.message],
			});
		case PRODUCT_DETAILS_ERROR:
			return Object.assign({}, state, {
				productDetailsData: [],
				productDetailsLoading: false,
				productDetailsMessage: [action.payload.message, ''],
			});

		case CLEAR_MESSAGES:
			return {
				...initialState,
				allProductsMessage: ['', ''],
				productDetailsMessage: ['', ''],
			};
		default:
			return state;
	}
}

export default product;
