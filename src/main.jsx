import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import { WorkoutsContextProvider } from './context/workout';
import { AuthContextProvider } from './context/auth';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<AuthContextProvider>
				<WorkoutsContextProvider>
					<App />
				</WorkoutsContextProvider>
			</AuthContextProvider>
		</Router>
	</React.StrictMode>
);
