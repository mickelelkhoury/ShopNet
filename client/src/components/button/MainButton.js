import React from 'react';

const MainButton = ({
	text,
	color,
	handleClick,
	btnWidth,
	btnHeight,
	btnMargin,
	btnFontSize,
	icon,
	...props
}) => {
	return (
		<button
			{...props}
			className={`button ${color}`}
			onClick={handleClick}
			style={{
				width: btnWidth || '100%',
				height: btnHeight || '100%',
				margin: btnMargin || '0',
				fontSize: btnFontSize || '16px',
			}}
		>
			{text}
			<span className='icon'>{icon}</span>
		</button>
	);
};

export default MainButton;
