export const setWorkouts = (workouts) => ({
	type: 'SET_WORKOUTS',
	payload: workouts,
});

export const createWorkout = (workout) => ({
	type: 'CREATE_WORKOUT',
	payload: workout,
});

export const deleteWorkout = (workout) => ({
	type: 'DELETE_WORKOUT',
	payload: workout,
});

export const loginAction = (user) => ({
	type: 'LOGIN',
	payload: user,
});

export const logoutAction = () => ({
	type: 'LOGOUT',
});
