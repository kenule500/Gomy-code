// function stepOne() {
//   // TODO: return a Promise that resolves with 'Step One Completed' after 1000ms
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('Step One Completed');
//     }, 1000);
//   });
// }
// function stepTwo(message) {
//   console.log(message);
//   // TODO: return a Promise that resolves with 'Step Two Completed' after 2000ms
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve('Step Two Completed');
//     }, 2000);
//   });
// }
// stepOne()
//   .then(stepTwo)
//   .then(result => {
//     console.log(result);
//   });




// const promise1 = Promise.resolve('Promise 1 resolved');
// const promise2 = new Promise(resolve => setTimeout(() => resolve('Promise 2 resolved'), 2000));
// const promise3 = new Promise(resolve => setTimeout(() => resolve('Promise 3 resolved'), 1000));
// console.log('Waiting for all promises...');
// // TODO: use Promise.all and log values when all complete
// Promise.all([promise1, promise2, promise3]).then(results => {
//   console.log(results);
// });


// const slow = new Promise(resolve => setTimeout(() => resolve('Slow wins'), 3000));
// const fast = new Promise(resolve => setTimeout(() => resolve('Fast wins'), 500));
// console.log('Racing...');
// // TODO: Promise.race and log the winner
// Promise.race([slow, fast]).then(result => {
//   console.log(result);
// });



// function checkNumber(num) {
//   // TODO: return a Promise that resolves or rejects based on num
//   return new Promise((resolve, reject) => {
//     if (num > 0) {
//       resolve('Number is positive');
//     } else {
//       reject('Number is not positive');
//     }
//   });
// }
// checkNumber(5)
//   .then(result => console.log('Test 5:', result))
//   .catch(error => console.error('Test 5 error:', error));
// checkNumber(-3)
//   .then(result => console.log('Test -3:', result))
//   .catch(error => console.error('Test -3 error:', error));




// function resolveAfter2Seconds() {
//   return new Promise(resolve => {
//     setTimeout(() => resolve('resolved after 2 seconds'), 2000);
//   });
// }
// async function asyncCall() {
//   console.log('calling');
//   // TODO: await resolveAfter2Seconds() and log the result
//   const result = await resolveAfter2Seconds();
//   console.log(result);
// }
// asyncCall();

function asyncTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        resolve('Task completed successfully');
      } else {
        reject(new Error('Task failed'));
      }
    }, 1000);
  });
}

console.log('Spawning 5 tasks simultaneously...\n');

// Call the function 5 separate times to observe the random distribution
for (let i = 1; i <= 5; i++) {
  asyncTask()
    .then(result => console.log(`Task #${i} ✅ Success: ${result}`))
    .catch(error => console.error(`Task #${i} ❌ Error: ${error.message}`));
}