import { INCREMENT, DECREMENT, ADD_BY } from './actionTypes';

export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
export const addBy = (n) => ({ type: ADD_BY, payload: n });