import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuth } from '../../hooks/useAuth';

const NavBar = () => {
	const { logout } = useLogout();
	const { user } = useAuth();

	const handleClick = () => {
		logout();
	};

	return (
		<>
			<header>
				<div className="container">
					<Link to="/">
						<h1>Workout Buddy</h1>
					</Link>
					<nav>
						{user && (
							<div>
								<span>{user.email}</span>
								<button onClick={handleClick}>Log Out</button>
							</div>
						)}
						{!user && (
							<div>
								<Link to="/login">Login</Link>
								<Link to="/signup">Signup</Link>
							</div>
						)}
					</nav>
				</div>
			</header>
			<Outlet />
		</>
	);
};

export default NavBar;
