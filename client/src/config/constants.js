export const NODE_ENV = 'development'; //'production'
export const SHOPNET_LOCAL = 'http://localhost:4000';
export const SHOPNET_API =
	NODE_ENV === 'development'
		? 'https://api.shopnet.net'
		: 'https://api.shopnet.com';
