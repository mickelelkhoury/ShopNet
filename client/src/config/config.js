import axios from 'axios';

const baseURL = 'http://localhost:4000/api/v1';

const errorCatch = (error) => {
	console.log('ERROR API: ', error);
	return error.response;
};

async function getAllProducts() {
	const url = `${baseURL}/product?page=1`;
	return await axios
		.get(url)
		.then((res) => res)
		.catch((err) => {
			return errorCatch(err);
		});
}

export { getAllProducts };
