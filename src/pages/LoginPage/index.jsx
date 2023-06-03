import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useLogin } from '../../hooks/useLogin';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { login, error, isLoading } = useLogin();

	const handleSubmit = async (e) => {
		e.preventDefault();

		await login(email, password);
	};

	const handleInputEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleInputPassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<h3>Log in</h3>

			<label htmlFor="email">Email:</label>
			<input type="text" name="email" value={email} onChange={handleInputEmail} />

			<label htmlFor="password">Password:</label>
			<input type="password" name="password" value={password} onChange={handleInputPassword} />
			<button disabled={isLoading}>Log in</button>
			{error && <ToastContainer />}
		</form>
	);
};

export default Login;
