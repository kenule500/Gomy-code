// ==============================
// STRING MANIPULATION FUNCTIONS
// ==============================

// Reverse a String
function reverseString(str) {
  return str.split("").reverse().join("");
}

// Count Characters
function countCharacters(str) {
  return str.length;
}

// Capitalize First Letter of Each Word
function capitalizeWords(sentence) {
  return sentence
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// ==============================
// ARRAY FUNCTIONS
// ==============================

// Find Maximum Value in Array
function findMax(arr) {
  return Math.max(...arr);
}

// Find Minimum Value in Array
function findMin(arr) {
  return Math.min(...arr);
}

// Sum of Array Elements
function sumArray(arr) {
  return arr.reduce((total, num) => total + num, 0);
}

// Filter Array Based on Condition
function filterArray(arr, conditionCallback) {
  return arr.filter(conditionCallback);
}

// ==============================
// MATHEMATICAL FUNCTIONS
// ==============================

// Factorial of a Number
function factorial(n) {
  if (n < 0) return null;
  return n <= 1 ? 1 : n * factorial(n - 1);
}

// Check if Number is Prime
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Generate Fibonacci Sequence
function generateFibonacci(n) {
  const fib = [0, 1];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib.slice(0, n);
}

// ==============================
// TESTING OUTPUT (OPTIONAL)
// ==============================

console.log(reverseString("hello"));
console.log(countCharacters("hello world"));
console.log(capitalizeWords("hello world from javascript"));

console.log(findMax([3, 7, 1, 9]));
console.log(findMin([3, 7, 1, 9]));
console.log(sumArray([1, 2, 3, 4]));
console.log(filterArray([1, 2, 3, 4, 5], x => x % 2 === 0));

console.log(factorial(5));
console.log(isPrime(11));
console.log(generateFibonacci(7));
