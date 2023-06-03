import { useAuth } from './useAuth';
import { useWorkouts } from './useWorkouts';
import { logoutAction, setWorkouts } from '../actions';

export const useLogout = () => {
	const { dispatch } = useAuth();
	const { dispatch: workoutsDispatch } = useWorkouts();
	const logout = () => {
		localStorage.removeItem('user');

		dispatch(logoutAction());
		workoutsDispatch(setWorkouts(null));
	};

	return { logout };
};
