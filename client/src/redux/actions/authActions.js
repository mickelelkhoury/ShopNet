import {toast} from 'react-toastify'

import {
	register,
	login,
	forgotPassword,
	resetPassword,
	logout,
} from '../../config/config'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR'

export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export const CLEAR_MESSAGES = 'CLEAR_MESSAGES'

const actions = {
	// REGISTER
	register: (data, history) => async (dispatch) => {
		try {
			dispatch({
				type: REGISTER_REQUEST,
			})
			await register(data).then((response) => {
				if (response.status === 200) {
					dispatch({
						type: REGISTER_SUCCESS,
						payload: {
							data: response.data,
							message: response.data.message,
						},
					})
				} else {
					toast.error(response.data.message, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					dispatch({
						type: REGISTER_ERROR,
						payload: {
							message: response.data.message,
						},
					})
				}
			})
		} catch (error) {
			toast.error(error.message || 'Error registering', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			dispatch({
				type: REGISTER_ERROR,
				payload: {
					message: error.message || 'Error registering',
				},
			})
		}
	},

	// LOGIN
	login: (data, history) => async (dispatch) => {
		try {
			dispatch({
				type: LOGIN_REQUEST,
			})
			await login(data).then((response) => {
				if (response.status === 200) {
					dispatch({
						type: LOGIN_SUCCESS,
						payload: {
							data: response.data,
							accessToken: response.data.token,
							message: response.data.message,
						},
					})
					localStorage.setItem('access_token', response.data.token)
					history?.push('/')
				} else {
					toast.error(response.data.message, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					dispatch({
						type: LOGIN_ERROR,
						payload: {
							message: response.data.message,
						},
					})
				}
			})
		} catch (error) {
			toast.error(error.message || 'Error logging in', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			dispatch({
				type: LOGIN_ERROR,
				payload: {
					message: error.message || 'Error logging in',
				},
			})
		}
	},

	// FORGOT PASSWORD
	forgotPassword: (data) => async (dispatch) => {
		try {
			dispatch({
				type: FORGOT_PASSWORD_REQUEST,
			})
			await forgotPassword(data).then((response) => {
				if (response.status === 200) {
					dispatch({
						type: FORGOT_PASSWORD_SUCCESS,
						payload: {
							data: response.data,
							message: response.data.message,
						},
					})
				} else {
					toast.error(response.data.message, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					dispatch({
						type: FORGOT_PASSWORD_ERROR,
						payload: {
							message: response.data.message,
						},
					})
				}
			})
		} catch (error) {
			toast.error(error.message || 'Error sending email', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			dispatch({
				type: FORGOT_PASSWORD_ERROR,
				payload: {
					message: error.message || 'Error sending email',
				},
			})
		}
	},

	// RESET PASSWORD
	resetPassword: (data) => async (dispatch) => {
		try {
			dispatch({
				type: RESET_PASSWORD_REQUEST,
			})
			await resetPassword(data).then((response) => {
				if (response.status === 200) {
					dispatch({
						type: RESET_PASSWORD_SUCCESS,
						payload: {
							data: response.data,
							message: response.data.message,
						},
					})
				} else {
					toast.error(response.data.message, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					dispatch({
						type: RESET_PASSWORD_ERROR,
						payload: {
							message: response.data.message,
						},
					})
				}
			})
		} catch (error) {
			toast.error(error.message || 'Error resetting password', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			dispatch({
				type: RESET_PASSWORD_ERROR,
				payload: {
					message: error.message || 'Error resetting password',
				},
			})
		}
	},

	// LOGOUT
	logout: () => async (dispatch) => {
		try {
			dispatch({
				type: LOGOUT_REQUEST,
			})
			await logout().then((response) => {
				if (response.status === 200) {
					dispatch({
						type: LOGOUT_SUCCESS,
						payload: {
							data: response.data,
							message: response.data.message,
						},
					})
					localStorage.removeItem('access_token')
				} else {
					toast.error(response.data.message, {
						position: 'top-right',
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
					})
					dispatch({
						type: LOGOUT_ERROR,
						payload: {
							message: response.data.message,
						},
					})
				}
			})
		} catch (error) {
			toast.error(error.message || 'Error logging out', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			dispatch({
				type: LOGOUT_ERROR,
				payload: {
					message: error.message || 'Error logging out',
				},
			})
		}
	},

	// CLEAR MESSAGES
	clearMessages: () => async (dispatch) => {
		dispatch({
			type: CLEAR_MESSAGES,
		})
	},
}

export default actions
