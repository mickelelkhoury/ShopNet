import React from 'react';

const MainButton = ({ text, color, handleClick, btnWidth, btnHeight }) => {
	return (
		<button
			className={`button ${color}`}
			onClick={handleClick}
			style={{ width: btnWidth || '100%', height: btnHeight || '100%' }}
		>
			{text}
		</button>
	);
};

export default MainButton;
