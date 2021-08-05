import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
		<div className='App'>
			<Header />
			<Home />
			<Footer />
		</div>
	);
}

export default App;
