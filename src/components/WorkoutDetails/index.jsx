import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useWorkouts } from '../../hooks/useWorkouts';
import { deleteWorkout } from '../../actions';
import { useAuth } from '../../hooks/useAuth';

const WorkoutDetails = ({ workout }) => {
	const { dispatch } = useWorkouts();
	const { user } = useAuth();

	const handleClick = async () => {
		if (!user) {
			return;
		}

		const options = {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};

		try {
			const id = workout._id;
			const res = await fetch(`https://workout-tracker-api-bemr.onrender.com/api/workouts/${id}`, options);
			const data = await res.json();

			if (res.ok) {
				dispatch(deleteWorkout(data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="workout-details">
			<h4>{workout.title}</h4>
			<p>
				<strong>Load (kg): </strong>
				{workout.load}
			</p>
			<p>
				<strong>Reps (kg): </strong>
				{workout.reps}
			</p>
			<p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
			<span className="material-symbols-outlined" onClick={handleClick}>
				delete
			</span>
		</div>
	);
};

export default WorkoutDetails;
