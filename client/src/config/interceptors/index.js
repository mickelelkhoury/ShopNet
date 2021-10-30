import axios from 'axios';
import { NODE_ENV, SHOPNET_LOCAL, SHOPNET_API } from '../constants';

export const PrivateApiCall = axios.create({
	baseURL: NODE_ENV === 'development' ? SHOPNET_LOCAL : SHOPNET_API,
});

export const PublicApiCall = axios.create({
	baseURL: NODE_ENV === 'development' ? SHOPNET_LOCAL : SHOPNET_API,
});

PrivateApiCall.interceptors.request.use(
	(req) => {
		const token = localStorage.getItem('access_token');
		// req.headers['incoming-origin'] =
		// 	window.location.host.split('.')[0] === APEKS_LOCAL_SUB
		// 		? 'myapeks'
		// 		: window.location.host.split('.')[0];
		req.headers.Authorization = `Bearer ${token}`;
		return req;
	},
	(err) => {
		throw err;
	}
);

PrivateApiCall.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		throw err;
	}
);
