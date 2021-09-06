import { toast } from 'react-toastify';

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
				console.log(response.data);
				if (response.status === 200) {
					dispatch({
						type: ALL_PRODUCTS_SUCCESS,
						payload: {
							data: response.data,
							message: response.data.message,
						},
					});
				} else {
					toast.error(response.data.message, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					});
					dispatch({
						type: ALL_PRODUCTS_ERROR,
						payload: {
							message: response.data.message,
						},
					});
				}
			});
		} catch (error) {
			toast.error(error.response.data.message || 'Error getting all products', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
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
