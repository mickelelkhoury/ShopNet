import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

// COMPONENTS
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';

// PAGES
import Home from './pages/home/Home';
import ProductDetails from './pages/product/ProductDetails';

// AUTH PAGES
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<div
					className='container'
					style={{ marginTop: '30px', marginBottom: '30px' }}
				>
					<Switch>
						<Route exact path='/' render={() => <Redirect to='/home' />} />
						<Route exact path='/home' component={Home} />
						<Route path='/search/:keyword' component={Home} />
						<Route exact path='/product/:id' component={ProductDetails} />

						<Route exact path='/login' component={Login} />
						<Route exact path='/register' component={Register} />
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
