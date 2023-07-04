import React, { useEffect } from 'react';
import { WorkoutDetails, WorkoutForm } from '../../components';
import { useWorkouts } from '../../hooks/useWorkouts';
import { setWorkouts } from '../../actions';
import { useAuth } from '../../hooks/useAuth';

const HomePage = () => {
	const { workouts, dispatch } = useWorkouts();
	const { user } = useAuth();
	// const options = {
	// 	headers: {
	// 		Authorization: `Bearer ${user.token}`,
	// 	},
	// };

	useEffect(() => {
		const fetchWorkouts = async () => {
			try {
				const res = await fetch('https://workout-tracker-api-bemr.onrender.com/api/workouts/', {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				});
				const data = await res.json();

				if (res.ok) {
					dispatch(setWorkouts(data));
				}
			} catch (error) {
				console.log(error);
			}
		};
		if (user) {
			fetchWorkouts();
		}
	}, [dispatch, user]);

	return (
		<div className="pages">
			<div className="home">
				<div className="workouts">{workouts && workouts.map((w) => <WorkoutDetails key={w._id} workout={w} />)}</div>
				<WorkoutForm />
			</div>
		</div>
	);
};

export default HomePage;
