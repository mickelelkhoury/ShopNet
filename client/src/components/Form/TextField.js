import React from 'react';
import { ErrorMessage, useField } from 'formik';

const TextField = ({ label, type, ...props }) => {
	const [field, meta] = useField(props);

	const text = (
		<div className='field'>
			<label className='label' htmlFor={field.name}>
				{label}
			</label>
			<div className='control'>
				<input
					{...field}
					{...props}
					className={`input is-primary ${
						meta.touched && meta.error && 'is-danger'
					}`}
				></input>
			</div>
			<ErrorMessage
				className='has-text-danger error'
				component='div'
				name={field.name}
			/>
		</div>
	);

	const textarea = (
		<div className='field'>
			<label className='label' htmlFor={field.name}>
				{label}
			</label>
			<div className='control'>
				<textarea
					{...field}
					{...props}
					className={`textarea is-primary ${
						meta.touched && meta.error && 'is-danger'
					}`}
				></textarea>
			</div>
			<ErrorMessage
				className='has-text-danger error'
				component='div'
				name={field.name}
			/>
		</div>
	);

	function typeCheck(type) {
		switch (type) {
			//   case 'password':
			//     return password
			case 'email':
			case 'text':
				return text;
			case 'textarea':
				return textarea;
			//   case 'mask':
			//     return maskInput
			default:
				return text;
		}
	}

	return typeCheck(type);
};

export default TextField;
