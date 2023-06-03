import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSignup } from '../../hooks/useSignup';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signup, isLoading, error } = useSignup();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await signup(email, password);
	};

	const handleInputEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleInputPassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<form className="signup" onSubmit={handleSubmit}>
			<h3>Sign Up</h3>

			<label htmlFor="email">Email:</label>
			<input type="text" name="email" onChange={handleInputEmail} value={email} />

			<label htmlFor="password">Password:</label>
			<input type="password" name="password" onChange={handleInputPassword} value={password} />
			<button disabled={isLoading}>Sign Up</button>
			{error && <ToastContainer />}
		</form>
	);
};

export default Signup;
