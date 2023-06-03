import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import * as P from './pages';
import { NavBar } from './layout';

const App = () => {
	const { user } = useAuth();
	return (
		<Routes>
			<Route path="/" element={<NavBar />}>
				<Route index element={user ? <P.HomePage /> : <Navigate to="/login" />} />
				<Route path="/login" element={!user ? <P.LoginPage /> : <Navigate to="/" />} />
				<Route path="/signup" element={!user ? <P.SignupPage /> : <Navigate to="/" />} />
			</Route>
		</Routes>
	);
};

export default App;
