function generateReport(name, scores) {
  const total = scores.reduce((sum, score) => sum + score, 0);
  const average = total / scores.length;
  const status = average >= 10 ? 'Pass' : 'Fail';

  return `Student: ${name}\nScores: ${scores.join(', ')}\nAverage: ${average.toFixed(2)}\nStatus: ${status}`;
}

module.exports = { generateReport };