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
	CLEAR_MESSAGES,
} from '../actions/authActions';

const initialState = {
	accessToken: '',
	isAuthenticated: false,

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
		case REGISTER_REQUEST:
			return Object.assign({}, state, {
				registerData: [],
				registerLoading: true,
				registerMessage: ['', ''],
			});
		case REGISTER_SUCCESS:
			return Object.assign({}, state, {
				registerData: action.payload.data,
				registerLoading: false,
				registerMessage: ['', action.payload.message],
			});
		case REGISTER_ERROR:
			return Object.assign({}, state, {
				registerData: [],
				registerLoading: false,
				registerMessage: [action.payload.message, ''],
			});

		case LOGIN_REQUEST:
			return Object.assign({}, state, {
				loginData: [],
				loginLoading: true,
				loginMessage: ['', ''],
				accessToken: '',
				// isAuthenticated: false,
			});
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				loginData: action.payload.data,
				loginLoading: false,
				loginMessage: ['', action.payload.message],
				isAuthenticated: true,
				accessToken: action.payload.accessToken,
			});
		case LOGIN_ERROR:
			return Object.assign({}, state, {
				loginData: [],
				loginLoading: false,
				loginMessage: [action.payload.message, ''],
				isAuthenticated: false,
				accessToken: '',
			});

		case FORGOT_PASSWORD_REQUEST:
			return Object.assign({}, state, {
				forgotPasswordData: [],
				forgotPasswordLoading: true,
				forgotPasswordMessage: ['', ''],
			});
		case FORGOT_PASSWORD_SUCCESS:
			return Object.assign({}, state, {
				forgotPasswordData: action.payload.data,
				forgotPasswordLoading: false,
				forgotPasswordMessage: ['', action.payload.message],
			});
		case FORGOT_PASSWORD_ERROR:
			return Object.assign({}, state, {
				forgotPasswordData: [],
				forgotPasswordLoading: false,
				forgotPasswordMessage: [action.payload.message, ''],
			});

		case RESET_PASSWORD_REQUEST:
			return Object.assign({}, state, {
				resetPasswordData: [],
				resetPasswordLoading: true,
				resetPasswordMessage: ['', ''],
			});
		case RESET_PASSWORD_SUCCESS:
			return Object.assign({}, state, {
				resetPasswordData: action.payload.data,
				resetPasswordLoading: false,
				resetPasswordMessage: ['', action.payload.message],
			});
		case RESET_PASSWORD_ERROR:
			return Object.assign({}, state, {
				resetPasswordData: [],
				resetPasswordLoading: false,
				resetPasswordMessage: [action.payload.message, ''],
			});

		case LOGOUT_REQUEST:
			return Object.assign({}, state, {
				logoutData: [],
				logoutLoading: true,
				logoutMessage: ['', ''],
			});
		case LOGOUT_SUCCESS:
			return Object.assign({}, state, {
				logoutData: action.payload.data,
				logoutLoading: false,
				logoutMessage: ['', action.payload.message],
			});
		case LOGOUT_ERROR:
			return Object.assign({}, state, {
				logoutData: [],
				logoutLoading: false,
				logoutMessage: [action.payload.message, ''],
			});

		case CLEAR_MESSAGES:
			return {
				...initialState,
				registerMessage: ['', ''],
				loginMessage: ['', ''],
				forgotPasswordMessage: ['', ''],
				resetPasswordMessage: ['', ''],
				logoutMessage: ['', ''],
			};

		default:
			return state;
	}
}

export default auth;
