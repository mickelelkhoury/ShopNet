import React from 'react';
import { ErrorMessage, useField } from 'formik';

const TextField = ({ label, type, icon, fieldStyle, ...props }) => {
	const [field, meta] = useField(props);

	const text = (
		<div className='field' style={fieldStyle}>
			<label className='label has-text-grey-dark' htmlFor={field.name}>
				{label}
			</label>
			<div className={`control ${icon ? 'has-icons-left' : ''}`}>
				<input
					{...field}
					{...props}
					className={`input is-primary ${
						meta.touched && meta.error && 'is-danger'
					}`}
				/>
				{icon && <span className='icon is-small is-left'>{icon}</span>}
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
			case 'number':
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
