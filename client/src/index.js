import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// TOAST
import { ToastContainer, Slide } from 'react-toastify';

// STYLES
import 'bulma/css/bulma.min.css';
import './assets/styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

ReactDOM.render(
	<Provider store={store}>
		<App />
		<ToastContainer transition={Slide} />
	</Provider>,
	document.getElementById('root')
);
