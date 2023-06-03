import { useReducer, createContext } from 'react';
import { workoutsReducer } from '../reducers';

export const WorkoutsContext = createContext();

const initialState = {
	workouts: null,
};

export const WorkoutsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(workoutsReducer, initialState);

	return <WorkoutsContext.Provider value={{ ...state, dispatch }}>{children}</WorkoutsContext.Provider>;
};
