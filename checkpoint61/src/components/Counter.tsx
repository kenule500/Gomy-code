import React, { Component } from "react";

/**
 * STEP 1: Define the state interface.
 * In plain JS, `state = { count: 0 }` was implicit — TypeScript has no way
 * of knowing what properties exist on `this.state`. By declaring
 * `CounterState`, we describe the exact shape of the component's state
 * so TypeScript can type-check every `this.state.count` access.
 */
interface CounterState {
  count: number;
}

/**
 * STEP 2: Define the props interface.
 * Even though this component receives no props, it is good practice to
 * declare the props type as an empty object or `Record<string, never>`.
 * The first generic parameter of `Component<P, S>` is Props, the second is State.
 *
 * If the component later needs props (e.g. `initialCount: number`),
 * you simply add them to `CounterProps` and every usage site is
 * automatically checked.
 */
interface CounterProps {
  // No props needed for this component
}

/**
 * STEP 3: Annotate the class with generic type parameters.
 * `Component<CounterProps, CounterState>` tells TypeScript:
 *  - First generic  → shape of `this.props`
 *  - Second generic → shape of `this.state`
 *
 * This removes the need for `as` casts and prevents accessing
 * non-existent properties on state or props.
 */
class Counter extends Component<CounterProps, CounterState> {
  /**
   * STEP 4: Explicitly type the `state` property.
   * `state: CounterState = { count: 0 }` ensures the initial state
   * matches the declared interface. If you forget `count` or add an
   * extra field, TypeScript will warn you.
   */
  state: CounterState = {
    count: 0,
  };

  /**
   * STEP 5: Type the class method.
   * `increment = (): void => { ... }` tells TypeScript that this method
   * takes no arguments and returns nothing. The arrow-function syntax
   * also auto-binds `this` so we don't need `.bind(this)` in the constructor.
   *
   * TypeScript automatically narrows `this.state` and `this.setState` to
   * use `CounterState`, so `count` is known to be a `number`.
   */
  increment = (): void => {
    this.setState({ count: this.state.count + 1 });
  };

  /**
   * STEP 6: `render()` already returns a ReactNode by default when
   * extending `Component`, but you can add `: JSX.Element` for clarity.
   */
  render(): JSX.Element {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default Counter;