import { Fragment } from 'react';

import './Header.scss';

const Header = (props) => {
	const burgerBtn = document.querySelector('#mobilemenu-burger');
	const burgerMenu = document.querySelector('#mobilemenu-menu');
	const toggleMobileMenu = () => {
		if (
			!burgerBtn.classList.contains('is-active') &&
			!burgerMenu.classList.contains('is-active')
		) {
			burgerBtn.classList.add('is-active');
			burgerMenu.classList.add('is-active');
		} else {
			burgerBtn.classList.remove('is-active');
			burgerMenu.classList.remove('is-active');
		}
	};

	return (
		<Fragment>
			<nav
				className='navbar is-light'
				role='navigation'
				aria-label='main navigation'
			>
				<div className='navbar-brand'>
					<a id='nav__logo' className='navbar-item h-100' href>
						<img src='https://bulma.io/images/bulma-logo.png' alt='logo' />
					</a>

					<div className='navbar-start'>
						<div className='navbar-item h-100'>
							<div class='field has-addons' id='nav__search'>
								<div class='control'>
									<input
										class='input is-primary'
										type='text'
										placeholder='Enter a product name...'
									/>
								</div>
								<div class='control'>
									<button class='button is-primary'>
										<i class='fa fa-search' aria-hidden='true'></i>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div
						className='navbar-burger'
						id='mobilemenu-burger'
						onClick={() => toggleMobileMenu()}
					>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
						<span aria-hidden='true'></span>
					</div>
				</div>

				<div className='navbar-menu' id='mobilemenu-menu'>
					<div className='navbar-end'>
						<div className='navbar-item'>
							<div className='buttons'>
								<button className='button is-primary'>Log in</button>
								<button className='button is-light'>
									<i class='fas fa-shopping-cart'></i>
									<span className='cart-badge'>2</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
