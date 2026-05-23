import React from "react";

/**
 * STEP 1: Define the props interface.
 * In plain JS, `{ name }` had no type safety — `name` could be anything
 * (number, object, undefined, etc.). With TypeScript, we declare exactly
 * what shape the props object must have using an `interface` or `type`.
 *
 * `interface GreetingProps` guarantees that anyone using <Greeting />
 * MUST pass a `name` prop of type `string`.
 */
interface GreetingProps {
  name: string;
}

/**
 * STEP 2: Annotate the component with the props type.
 * Instead of `({ name })` (implicit `any`), we write
 * `({ name }: GreetingProps)` so TypeScript knows the type of `name`
 * inside the function body.
 *
 * STEP 3: Add an explicit return type.
 * `: JSX.Element` tells TypeScript (and anyone reading the code) that
 * this component always returns a React JSX element. It catches mistakes
 * like accidentally returning `undefined` or `null`.
 */
const Greeting = ({ name }: GreetingProps): JSX.Element => {
  return <div>Hello, {name}!</div>;
};

export default Greeting;