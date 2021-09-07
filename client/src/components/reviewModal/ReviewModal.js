import { useState } from 'react';
import StarPicker from 'react-star-picker';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';

const reviewSchema = Yup.object().shape({
	rating: Yup.number().required(''),
	comment: Yup.string(),
});

const customRenderer = ({ index, selectedIndex, hoverIndex }) => {
	const selected = selectedIndex != null && index <= selectedIndex;
	const hovered = hoverIndex != null && index <= hoverIndex;
	const color = '#00d1b2';
	return (
		<div
			style={{
				color: selected ? color : hovered ? color : 'gray',
				fontSize: 30,
			}}
		>
			{selected || hovered ? (
				<FontAwesomeIcon icon={faStar} />
			) : (
				<FontAwesomeIcon icon={farStar} />
			)}
		</div>
	);
};

const ReviewModal = ({ isOpen, setIsOpen }) => {
	const [reviewRating, setReviewRating] = useState(null);
	const [values, setValues] = useState({
		rating: reviewRating,
		comment: '',
		// user: '',
		// name: '',
	});

	const handleStarReview = (e) => {
		setReviewRating(e);
		console.log(e);
	};

	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<div className={`modal ${isOpen ? 'is-active' : ''}`}>
			<div className='modal-background'></div>
			<div className='modal-card'>
				<header className='modal-card-head'>
					<p className='modal-card-title has-text-grey-dark'>Create review:</p>
					<button
						className='delete'
						aria-label='close'
						onClick={() => setIsOpen(false)}
					></button>
				</header>
				<Formik
					initialValues={values}
					onSubmit={handleSubmit}
					validationSchema={reviewSchema}
					enableReinitialize={true}
				>
					{(formik) => (
						<Form>
							<section className='modal-card-body'>
								<StarPicker
									name='rating'
									onChange={handleStarReview}
									value={reviewRating}
									className='CustomStarPicker'
									disabled={false}
									doubleTapResets={true}
									halfStars={true}
									numberStars={5}
									size={70}
									starRenderer={customRenderer}
								/>
							</section>
							<footer className='modal-card-foot'>
								<button className='button is-primary' type='submit'>
									Save changes
								</button>
								<button className='button dark-btn is-dark'>Cancel</button>
							</footer>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default ReviewModal;
