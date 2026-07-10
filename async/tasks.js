// Task 1

// Helper utility to create a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function iterateWithAsyncAwait(values) {
  for (const value of values) {
    await delay(1000); // Wait 1 second
    console.log(value);
  }
}

// Example Execution:
iterateWithAsyncAwait(["Apple", "Banana", "Cherry"]);


// Task 2 & 3
// Simulating an API Fetch that randomly succeeds or fails
const simulateApiFetch = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccessful = Math.random() > 0.3; // 70% success rate
      if (isSuccessful) {
        resolve({ data: "Successfully fetched user profile records!" });
      } else {
        reject(new Error("Network connection timeout"));
      }
    }, 1500);
  });
};

async function awaitCall() {
  console.log("Fetching API data...");
  try {
    const response = await simulateApiFetch();
    console.log("Success:", response.data);
  } catch (error) {
    // Task 03: Catch the error gracefully and log a user-friendly message
    console.log("Notice: Unable to retrieve server data at this time. Please try again later.");
  }
}

// Part B: Chaining Async Functions Sequentially
const stepOne = async () => { await delay(1000); console.log("Step 1: User authenticated."); };
const stepTwo = async () => { await delay(1000); console.log("Step 2: Database state updated."); };
const stepThree = async () => { await delay(1000); console.log("Step 3: UI re-rendered successfully."); };

async function chainedAsyncFunctions() {
  console.log("Starting sequence...");
  await stepOne();
  await stepTwo();
  await stepThree();
  console.log("All steps complete!");
}

// Task 04: Awaiting Concurrent Requests
// Two separate mock API calls
const fetchUsers = () => new Promise(res => setTimeout(() => res(["Alice", "Bob"]), 1000));
const fetchPosts = () => new Promise(res => setTimeout(() => res(["Post 1", "Post 2"]), 1200));

async function concurrentRequests() {
  console.log("Firing concurrent API requests...");
  try {
    // Both requests execute simultaneously
    const [users, posts] = await Promise.all([fetchUsers(), fetchPosts()]);
    
    console.log("Combined Results fetched successfully:");
    console.log("Users:", users);
    console.log("Posts:", posts);
  } catch (error) {
    console.error("One or more requests failed:", error);
  }
}