const generator = require("generate-password");

const password = generator.generate({
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  lowercase: true,
  strict: true,
});

console.log(password);