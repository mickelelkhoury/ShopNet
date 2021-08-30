import { getAllProducts } from '../../config/config';

export const ALL_PRODUCTS_REQUEST = 'ALL_PRODUCTS_REQUEST';
export const ALL_PRODUCTS_SUCCESS = 'ALL_PRODUCTS_SUCCESS';
export const ALL_PRODUCTS_ERROR = 'ALL_PRODUCTS_ERROR';

export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

const actions = {
	// GET ALL PRODUCTS
	getAllProducts: () => async (dispatch) => {
		try {
			dispatch({
				type: ALL_PRODUCTS_REQUEST,
			});
			await getAllProducts().then((response) => {
				if (response.status === 200) {
					dispatch({
						type: ALL_PRODUCTS_SUCCESS,
						payload: {
							data: response.data,
						},
					});
				} else {
					dispatch({
						type: ALL_PRODUCTS_ERROR,
						payload: {
							message: response.message,
						},
					});
				}
			});
		} catch (error) {
			dispatch({
				type: ALL_PRODUCTS_ERROR,
				payload: {
					message: error.response.data.message || 'Error getting all products',
				},
			});
		}
	},

	// CLEAR MESSAGES
	clearMessages: () => async (dispatch) => {
		dispatch({
			type: CLEAR_MESSAGES,
		});
	},
};

export default actions;
