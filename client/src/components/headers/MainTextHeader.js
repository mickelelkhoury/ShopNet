import './TypographyStyle.scss';

const MainHeader = (props) => {
	return (
		<div id='main-header'>
			<h1 className='is-size-1-tablet is-size-3-mobile has-text-weight-semibold is-capitalized'>
				{props.title}
			</h1>
		</div>
	);
};

export default MainHeader;
