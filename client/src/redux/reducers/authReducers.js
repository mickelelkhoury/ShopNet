import {
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	FORGOT_PASSWORD_REQUEST,
	FORGOT_PASSWORD_SUCCESS,
	FORGOT_PASSWORD_ERROR,
	RESET_PASSWORD_REQUEST,
	RESET_PASSWORD_SUCCESS,
	RESET_PASSWORD_ERROR,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_ERROR,
} from '../actions/authActions';

const initialState = {
	registerData: [],
	registerLoading: false,
	registerMessage: ['', ''],

	loginData: [],
	loginLoading: false,
	loginMessage: ['', ''],

	forgotPasswordData: [],
	forgotPasswordLoading: false,
	forgotPasswordMessage: ['', ''],

	resetPasswordData: [],
	resetPasswordLoading: false,
	resetPasswordMessage: ['', ''],

	logoutData: [],
	logoutLoading: false,
	logoutMessage: ['', ''],
};

function auth(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}

export default auth;
