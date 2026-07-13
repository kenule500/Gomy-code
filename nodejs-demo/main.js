const { generateReport } = require('./reportGenerator');

const report = generateReport('Alice', [12, 15, 8, 14, 10]);
console.log(report);