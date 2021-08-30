import { combineReducers } from 'redux';
import product from './productReducers';

const reducers = combineReducers({
	product,
});

export default reducers;
