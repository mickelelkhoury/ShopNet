import React from 'react';

// SCSS
import './Loading.scss';

const Loading = () => {
	return (
		<div className='spinners'>
			<div className='spinner-block'>
				<div className='spinner spinner-1'></div>
			</div>
			<h1>Loading...</h1>
		</div>
	);
};

export default Loading;
