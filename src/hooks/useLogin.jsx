import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './useAuth.jsx';
import { loginAction } from '../actions';

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = useAuth();

	const errorCreate = (error) =>
		toast.error(error, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'light',
		});

	const login = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		};

		const res = await fetch('http://localhost:3000/api/user/login', options);
		const data = await res.json();

		if (!res.ok) {
			setIsLoading(false);
			setError(data.error);
			errorCreate(`${data.error}`);
		}

		if (res.ok) {
			localStorage.setItem('user', JSON.stringify(data));

			dispatch(loginAction(data));

			setIsLoading(false);
		}
	};

	return { login, isLoading, error };
};
