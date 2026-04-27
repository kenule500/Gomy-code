import { INCREMENT, DECREMENT, ADD_BY } from './actionTypes';

const initialState = { count: 0 };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    case ADD_BY:
      return { ...state, count: state.count + action.payload };
    default:
      return state;
  }
}
