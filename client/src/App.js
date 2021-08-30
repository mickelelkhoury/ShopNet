import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

// STYLES
import 'bulma/css/bulma.min.css';
import './assets/styles/style.scss';

// COMPONENTS
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';

// PAGES
import Home from './pages/home/Home';

function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<div className='container'>
					<Switch>
						<Route exact path='/' render={() => <Redirect to='/home' />} />
						<Route exact path='/home' component={Home} />
					</Switch>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
