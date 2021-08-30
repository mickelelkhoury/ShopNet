// COMPONENT
import MainTextHeader from '../../components/headers/MainTextHeader';
import ItemCard from '../../components/itemCard/ItemCard';
import MetaData from '../../components/layout/MetaData';

const Home = () => {
	return (
		<>
			<MetaData title='Buy Best Product Online' />
			<MainTextHeader title='latest products' />
			<section className='container py-6 px-6-mobile px-3'>
				<div className='columns is-flex is-flex-wrap-wrap'>
					<div className='column is-half-mobile is-one-quarter-tablet'>
						<ItemCard />
					</div>
					<div className='column is-half-mobile is-one-quarter-tablet'>
						<ItemCard />
					</div>
					<div className='column is-half-mobile is-one-quarter-tablet'>
						<ItemCard />
					</div>
					<div className='column is-half-mobile is-one-quarter-tablet'>
						<ItemCard />
					</div>
				</div>
			</section>
		</>
	);
};

export default Home;