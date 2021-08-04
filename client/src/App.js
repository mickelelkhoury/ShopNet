import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// STYLES
import './assets/styles/style.scss';

// COMPONENTS
import Header from './components/layout/header/Header';

function App() {
	return (
		<div className='App'>
			<Header />
		</div>
	);
}

export default App;
