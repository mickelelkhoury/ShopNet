import axios from 'axios';

const baseURL = 'http://localhost:4000/api/v1';

const errorCatch = (error) => {
	console.log('ERROR API: ', error);
	return error.response;
};

// GET ALL PRODUCTS
async function getAllProducts(currentPage, keyword) {
	const url = `${baseURL}/product?keyword=${keyword}&page=${currentPage}`;
	return await axios
		.get(url)
		.then((res) => res)
		.catch((err) => {
			return errorCatch(err);
		});
}

// GET PRODUCT DETAILS
async function getProductDetails(data) {
	const url = `${baseURL}/product/${data.id}`;
	return await axios
		.get(url)
		.then((res) => res)
		.catch((err) => {
			return errorCatch(err);
		});
}

export { getAllProducts, getProductDetails };
