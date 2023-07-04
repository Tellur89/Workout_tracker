import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWorkouts } from '../../hooks/useWorkouts';
import { createWorkout } from '../../actions';
import { useAuth } from '../../hooks/useAuth';

const WorkoutForm = () => {
	const { dispatch } = useWorkouts();
	const { user } = useAuth();

	const [title, setTitle] = useState('');
	const [load, setLoad] = useState('');
	const [reps, setReps] = useState('');
	const [emptyFields, setEmptyFields] = useState([]);

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

	const handleInputExercise = (e) => {
		setTitle(e.target.value);
	};
	const handleInputLoad = (e) => {
		setLoad(e.target.value);
	};
	const handleInputReps = (e) => {
		setReps(e.target.value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!user) {
			errorCreate('You must be logged in');
			return;
		}
		const workout = { title, load, reps };

		const options = {
			method: 'POST',
			body: JSON.stringify(workout),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`,
			},
		};

		try {
			const res = await fetch('https://workout-tracker-api-bemr.onrender.com/api/workouts/', options);
			const data = await res.json();

			if (!res.ok) {
				errorCreate(`${data.error}`);
				setEmptyFields(data.emptyFields);
			}
			if (res.ok) {
				setTitle('');
				setLoad('');
				setReps('');
				setEmptyFields([]);
				dispatch(createWorkout(data));
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a New Workout</h3>
			<label htmlFor="exercise">Exercise Title:</label>
			<input type="text" name="exercise" onChange={handleInputExercise} value={title} className={emptyFields.includes('title') ? 'error' : ''} />

			<label htmlFor="load">Load (kg):</label>
			<input type="number" name="load" onChange={handleInputLoad} value={load} className={emptyFields.includes('load') ? 'error' : ''} />

			<label htmlFor="reps">Reps:</label>
			<input type="number" name="reps" onChange={handleInputReps} value={reps} className={emptyFields.includes('reps') ? 'error' : ''} />

			<button>Add Workout</button>
			<ToastContainer />
		</form>
	);
};

export default WorkoutForm;
