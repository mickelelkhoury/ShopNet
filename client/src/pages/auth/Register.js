import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

// REDUX
import { connect } from 'react-redux';
import authActions from '../../redux/actions/authActions';

// SCSS
import './auth.scss';

// COMPONENTS
import MetaData from '../../components/layout/MetaData';
import MainTextHeader from '../../components/headers/MainTextHeader';
import TextField from '../../components/Form/TextField';

// IMAGES
import avatar from '../../assets/images/user.png';

const registerSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string().email('Invalid email').required('Email is required'),
	password: Yup.string()
		.matches(
			/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
			'Invalid password'
		)
		.required('Password is required'),
});

export const Register = ({ register, registerLoading }) => {
	const history = useHistory();

	const values = {
		name: '',
		email: '',
		password: '',
		avatar: '',
	};

	const [avatarPreview, setAvatarPreview] = useState(avatar);

	const handleSubmit = (value) => {
		register(value, history);
	};

	return (
		<>
			<MetaData title='Register' />
			<section className='container py-6 px-6-mobile px-3'>
				<div className='card'>
					<div className='card-content'>
						<MainTextHeader title='Register' />
						<Formik
							initialValues={values}
							onSubmit={handleSubmit}
							validationSchema={registerSchema}
						>
							{(formik) => (
								<Form>
									<div className='login-form-field mt-5'>
										<TextField
											name='name'
											type='text'
											label='Name'
											placeholder='name'
										/>
									</div>
									<div className='login-form-field'>
										<TextField
											name='email'
											type='email'
											label='Email'
											placeholder='Email'
											icon={<FontAwesomeIcon icon={faEnvelope} />}
										/>
									</div>
									<div className='login-form-field'>
										<TextField
											name='password'
											type='password'
											label='Password'
											placeholder='Password'
											icon={<FontAwesomeIcon icon={faLock} />}
										/>
									</div>
									<div className='login-form-field-file'>
										<label
											className='label m-0 has-text-grey-dark'
											htmlFor='avatar'
										>
											Avatar
										</label>
										<div className='file-field'>
											<figure class='image is-48x48'>
												<img
													className='is-rounded avatar-img'
													src={avatarPreview}
													alt='avatar'
												/>
											</figure>
											<div class='file has-name is-right'>
												<label class='file-label'>
													<input class='file-input' type='file' name='avatar' />
													<span class='file-cta'>
														<span class='file-label'>Browse</span>
													</span>
													<span class='file-name'>No file selected</span>
												</label>
											</div>
										</div>
									</div>
									<button
										className={`button is-primary w-100 ${
											registerLoading && 'is-loading'
										}`}
										type='submit'
									>
										Register
									</button>
								</Form>
							)}
						</Formik>
					</div>
				</div>
			</section>
		</>
	);
};

const mapStateToProps = (state) => ({
	registerLoading: state.auth.registerLoading,
});

const mapDispatchToProps = (dispatch) => ({
	register: (data, history) => dispatch(authActions.register(data, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
