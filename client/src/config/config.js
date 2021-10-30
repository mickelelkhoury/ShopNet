import axios from 'axios';

const baseURL = 'http://localhost:4000/api/v1';

const errorCatch = (error) => {
	console.log('ERROR API', error, error?.response);
	if (error.response) {
		if (error.reponse?.data) {
			return error.response?.data;
		}
		return error.response;
	} else {
		return error;
	}
};

/**
 *
 * AUTH
 *
 */

// REGISTER
async function register(data) {
	const url = `${baseURL}/register`;
	return await axios
		.post(url, data)
		.then((res) => res)
		.catch((err) => errorCatch(err));
}

// LOGIN
async function login(data) {
	const url = `${baseURL}/login`;
	return await axios
		.post(url, data)
		.then((res) => res)
		.catch((err) => errorCatch(err));
}

// FORGOT PASSWORD
async function forgotPassword(data) {
	const url = `${baseURL}/login`;
	return await axios
		.post(url, data)
		.then((res) => res)
		.catch((err) => errorCatch(err));
}

// RESET PASSWORD
async function resetPassword(data) {
	const url = `${baseURL}/login`;
	return await axios
		.put(url, data)
		.then((res) => res)
		.catch((err) => errorCatch(err));
}

// LOGOUT
async function logout(data) {
	const url = `${baseURL}/login`;
	return await axios
		.get(url, data)
		.then((res) => res)
		.catch((err) => errorCatch(err));
}

/**
 *
 * ADMIN
 *
 */

// GET ALL USERS
// GET USER DETAILS
// EDIT USER DETAILS
// DELETE USER

/**
 *
 * USER
 *
 */

// GET ME
// EDIT ME
// CHANGE PASSWORD
//

/**
 *
 * PRODUCT
 *
 */

// GET ALL PRODUCTS
async function getAllProducts(currentPage, keyword, price) {
	const url = `${baseURL}/product?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
	return await axios
		.get(url)
		.then((res) => res)
		.catch((err) => errorCatch(err));
}

// GET PRODUCT DETAILS
async function getProductDetails(data) {
	const url = `${baseURL}/product/${data.id}`;
	return await axios
		.get(url)
		.then((res) => res)
		.catch((err) => errorCatch(err));
}

export {
	// AUTH
	register,
	login,
	forgotPassword,
	resetPassword,
	logout,
	// PRODUCT
	getAllProducts,
	getProductDetails,
};
