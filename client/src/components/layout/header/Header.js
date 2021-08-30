import { useState } from 'react';
import './Header.scss';

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
						<img src='https://bulma.io/images/bulma-logo.png' alt='logo' />
					</a>

					<div className='navbar-start'>
						<div className='navbar-item h-100'>
							<div className='field has-addons' id='nav__search'>
								<div className='control'>
									<input
										className='input is-primary'
										type='text'
										placeholder='Enter a product name...'
									/>
								</div>
								<div className='control'>
									<button className='button is-primary'>
										<i className='fa fa-search' aria-hidden='true'></i>
									</button>
								</div>
							</div>
						</div>
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
									<i className='fas fa-shopping-cart'></i>
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
