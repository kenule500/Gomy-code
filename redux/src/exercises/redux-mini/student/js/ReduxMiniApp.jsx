import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, addBy } from './actions';

function ReduxMiniApp() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch(decrement())}>-</button>
      -
      <button onClick={() => dispatch(increment())}>+</button>
      -
      <button onClick={() => dispatch(addBy(5))}>+5</button>
    </div>
  );
}

export default ReduxMiniApp;