import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Header from './components/layout/header/Header';
import Footer from './components/layout/footer/Footer';

function App() {
	return (
		<div className='App'>
			<Header />
			<Footer />
		</div>
	);
}

export default App;
