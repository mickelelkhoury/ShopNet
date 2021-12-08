import React, { useEffect } from 'react';
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

const loginSchema = Yup.object().shape({
	email: Yup.string().required('Email is required'),
	password: Yup.string().required('Password is required'),
});

const Login = ({ login, loginLoading, isAuthenticated, accessToken }) => {
	const history = useHistory();

	// FIXME: To fix re routing issue
	console.log(accessToken);

	useEffect(() => {
		if (isAuthenticated === true) {
			console.log('32323');
			history.push('/');
		}
	}, [isAuthenticated, history]);

	const handleSubmit = (values) => {
		login(values, history);
	};

	return (
		<>
			<MetaData title='Login' />
			<section className='container py-6 px-6-mobile px-3'>
				<div className='card'>
					<div className='card-content'>
						<MainTextHeader title='Login' />
						<Formik
							initialValues={{ email: '', password: '' }}
							onSubmit={handleSubmit}
							validationSchema={loginSchema}
						>
							{(formik) => (
								<Form>
									<div className='login-form-field mt-5'>
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
									<div className='is-flex is-justify-content-flex-end'>
										<div
											className='has-text-primary is-clickable is-underlined mb-4'
											onClick={() => history.push('/forgot-password')}
										>
											Forgot Password?
										</div>
									</div>
									<button
										className={`button is-primary w-100 ${
											loginLoading && 'is-loading'
										}`}
										type='submit'
									>
										Login
									</button>
									<div className='is-flex mt-4'>
										Don't have an account?
										<div
											className='has-text-primary is-clickable is-underlined ml-1'
											onClick={() => history.push('/register')}
										>
											Register here
										</div>
									</div>
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
	loginData: state.auth.loginData,
	loginLoading: state.auth.loginLoading,
	isAuthenticated: state.auth.isAuthenticated,
	accessToken: state.auth.accessToken,
});

const mapDispatchToProps = (dispatch) => ({
	login: (data, history) => dispatch(authActions.login(data, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
