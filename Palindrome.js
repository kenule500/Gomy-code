function isPalindrome(word) {
  // 1. Stop condition: an empty word or a single character is a palindrome
  if (word.length <= 1) {
    return true;
  }

  // 2. Compare the characters located at the ends of the word
  const firstChar = word[0];
  const lastChar = word[word.length - 1];

  if (firstChar === lastChar) {
    // If equality, test the rest of the word (slicing off the ends)
    const restOfWord = word.slice(1, -1);
    return isPalindrome(restOfWord);
  } else {
    // If difference, we stop immediately
    return false;
  }
}

// --- Test Cases ---
console.log(isPalindrome("gag"));   // true
console.log(isPalindrome("kayak")); // true
console.log(isPalindrome("radar")); // true
console.log(isPalindrome("php"));   // true
console.log(isPalindrome("hello")); // false