// 1. Decision Making (if-else and switch)
// Ticket Pricing (Using if-else)

    function getTicketPrice(age) {
    let price;

    if (age <= 12) {
        price = 10;
    } else if (age >= 13 && age <= 17) {
        price = 15;
    } else if (age >= 18) {
        price = 20;
    } else {
        return "Invalid age entered.";
    }

    return `The ticket price is $${price}.`;
}

// Example usage:
console.log(getTicketPrice(15)); // Output: The ticket price is $15.


// Leap Year Checker (Using Logical Operators)

function isLeapYear(year) {
    // Divisible by 4 AND (not divisible by 100 OR divisible by 400)
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return `${year} is a leap year.`;
    } else {
        return `${year} is not a leap year.`;
    }
}

// Example usage:
console.log(isLeapYear(2024)); // Output: 2024 is a leap year.


// 2. Recursion

// Fibonacci Sequence

function fibonacci(n) {
    // Base Case: if n is 0 or 1, return n
    if (n <= 1) return n;

    // Recursive Case: sum of the two preceding numbers
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage:
console.log(fibonacci(6)); // Output: 8


function power(base, exponent) {
    // Base Case: any number to the power of 0 is 1
    if (exponent === 0) return 1;
    
    // Handle negative exponents (optional but good practice)
    if (exponent < 0) return 1 / power(base, -exponent);

    // Recursive Case
    return base * power(base, exponent - 1);
}

// Example usage:
console.log(power(2, 3)); // Output: 8 (2 * 2 * 2)