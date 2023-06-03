import { WorkoutsContext } from '../context/workout';
import { useContext } from 'react';

export const useWorkouts = () => {
	const context = useContext(WorkoutsContext);

	if (!context) {
		throw new Error('useWorkouts must be used inside a WorkoutsContextProvider');
	}

	return context;
};
