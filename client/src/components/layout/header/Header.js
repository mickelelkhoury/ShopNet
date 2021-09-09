import { useState } from 'react';
import { Route } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// SCSS
import './Header.scss';

// COMPONENTS
import Search from '../Search';

// IMAGES
import logo from '../../../assets/images/cart.svg';

const Header = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<nav
				className='navbar is-light'
				role='navigation'
				aria-label='main navigation'
			>
				<div className='navbar-brand'>
					<a id='nav__logo' className='navbar-item h-100' href='/'>
						<img src={logo} alt='ShopNet' />
						Shop<span>Net</span>
					</a>

					<div className='navbar-start'>
						<Route render={({ history }) => <Search history={history} />} />
					</div>

					<div
						className={`navbar-burger ${isOpen ? 'is-active' : ''}`}
						onClick={() => setIsOpen(!isOpen)}
					>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
					</div>
				</div>

				<div className={`navbar-menu  ${isOpen ? 'is-active' : ''}`}>
					<div className='navbar-end'>
						<div className='navbar-item'>
							<div className='buttons'>
								<button className='button is-primary'>Log in</button>
								<button className='button is-light'>
									<FontAwesomeIcon icon={faShoppingCart} />
									<span className='cart-badge'>2</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Header;
