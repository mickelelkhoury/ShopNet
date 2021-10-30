import { combineReducers } from 'redux';

import auth from './authReducers';
import product from './productReducers';

const reducers = combineReducers({
	auth,
	product,
});

export default reducers;
