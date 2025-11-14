//  ASYNC PROGRAMMING CHALLENGES
// Practice these problems to master async operations in Node.js

const fs = require('fs').promises;

console.log('=== ASYNC PROGRAMMING CHALLENGES ===\n');

/* 
 * CHALLENGE 1: Sequential File Reading
 * Read 3 files one after another and print their contents
 * Difficulty: Easy
 */
async function challenge1() {
  console.log('--- Challenge 1: Sequential File Reading ---');
  try {
    // TODO: Read file1.txt, file2.txt, file3.txt sequentially
    // Hint: Use await for each file read
    
    const file1 = await fs.readFile('file1.txt', 'utf8');
    console.log('File 1:', file1);
    
    const file2 = await fs.readFile('file2.txt', 'utf8');
    console.log('File 2:', file2);
    
    const file3 = await fs.readFile('file3.txt', 'utf8');
    console.log('File 3:', file3);
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

/* 
 * CHALLENGE 2: Parallel File Reading
 * Read 3 files simultaneously using Promise.all
 * Difficulty: Easy
 */
async function challenge2() {
  console.log('\n--- Challenge 2: Parallel File Reading ---');
  try {
    // TODO: Read all files in parallel
    // Hint: Use Promise.all([...])
    
    const [file1, file2, file3] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8'),
      fs.readFile('file3.txt', 'utf8')
    ]);
    
    console.log('All files read in parallel!');
    console.log('File 1:', file1);
    console.log('File 2:', file2);
    console.log('File 3:', file3);
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

/* 
 * CHALLENGE 3: Retry Mechanism
 * Implement a function that retries failed operations
 * Difficulty: Medium
 */
async function retryOperation(operation, maxRetries = 3) {
  // TODO: Implement retry logic
  // If operation fails, retry up to maxRetries times
  // Use exponential backoff (1s, 2s, 4s...)
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}...`);
      const result = await operation();
      return result;
    } catch (err) {
      if (attempt === maxRetries) {
        throw new Error(`Failed after ${maxRetries} attempts: ${err.message}`);
      }
      
      // Exponential backoff
      const delay = Math.pow(2, attempt - 1) * 1000;
      console.log(`Failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

async function challenge3() {
  console.log('\n--- Challenge 3: Retry Mechanism ---');
  
  // Simulate unreliable API
  let callCount = 0;
  const unreliableOperation = async () => {
    callCount++;
    if (callCount < 3) {
      throw new Error('Network error');
    }
    return 'Success!';
  };
  
  try {
    const result = await retryOperation(unreliableOperation, 5);
    console.log('Result:', result);
  } catch (err) {
    console.error('Final error:', err.message);
  }
}

/* 
 * CHALLENGE 4: Timeout Implementation
 * Create a function that times out if operation takes too long
 * Difficulty: Medium
 */
function withTimeout(promise, ms) {
  // TODO: Implement timeout using Promise.race
  // If promise takes longer than ms, reject with timeout error
  
  const timeout = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Operation timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

async function challenge4() {
  console.log('\n--- Challenge 4: Timeout Implementation ---');
  
  const slowOperation = () => new Promise(resolve => 
    setTimeout(() => resolve('Completed'), 3000)
  );
  
  try {
    console.log('Starting operation with 2s timeout...');
    const result = await withTimeout(slowOperation(), 2000);
    console.log(result);
  } catch (err) {
    console.log('Caught:', err.message);
  }
  
  try {
    console.log('Starting operation with 5s timeout...');
    const result = await withTimeout(slowOperation(), 5000);
    console.log(result);
  } catch (err) {
    console.log('Caught:', err.message);
  }
}

/* 
 * CHALLENGE 5: Promise.allSettled Usage
 * Fetch data from multiple sources, some may fail
 * Difficulty: Medium
 */
async function challenge5() {
  console.log('\n--- Challenge 5: Promise.allSettled ---');
  
  // Simulate API calls (some will fail)
  const fetchUser = () => Promise.resolve({ id: 1, name: 'Satyam' });
  const fetchPosts = () => Promise.reject('Posts API down');
  const fetchComments = () => Promise.resolve([{ text: 'Great!' }]);
  
  // TODO: Use Promise.allSettled to get all results
  // Separate successful and failed results
  
  const results = await Promise.allSettled([
    fetchUser(),
    fetchPosts(),
    fetchComments()
  ]);
  
  const successful = results
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value);
  
  const failed = results
    .filter(r => r.status === 'rejected')
    .map(r => r.reason);
  
  console.log('Successful:', successful);
  console.log('Failed:', failed);
}

/* 
 * CHALLENGE 6: Rate Limiter
 * Execute functions with rate limiting
 * Difficulty: Hard
 */
class RateLimiter {
  constructor(maxCalls, perMilliseconds) {
    this.maxCalls = maxCalls;
    this.perMilliseconds = perMilliseconds;
    this.calls = [];
  }
  
  async execute(fn) {
    // TODO: Implement rate limiting
    // Allow only maxCalls within perMilliseconds window
    
    const now = Date.now();
    this.calls = this.calls.filter(time => now - time < this.perMilliseconds);
    
    if (this.calls.length >= this.maxCalls) {
      const oldestCall = this.calls[0];
      const waitTime = this.perMilliseconds - (now - oldestCall);
      console.log(`Rate limit reached. Waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return this.execute(fn);
    }
    
    this.calls.push(now);
    return fn();
  }
}

async function challenge6() {
  console.log('\n--- Challenge 6: Rate Limiter ---');
  
  // Allow 3 calls per 2 seconds
  const limiter = new RateLimiter(3, 2000);
  
  const apiCall = (id) => {
    console.log(`API call ${id} at ${new Date().toLocaleTimeString()}`);
    return Promise.resolve(`Result ${id}`);
  };
  
  // Try to make 5 calls (3 should go through, 2 should wait)
  for (let i = 1; i <= 5; i++) {
    await limiter.execute(() => apiCall(i));
  }
}

/* 
 * CHALLENGE 7: Async Queue
 * Process tasks one at a time in order
 * Difficulty: Hard
 */
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }
  
  async add(task) {
    // TODO: Add task to queue and process
    this.queue.push(task);
    if (!this.processing) {
      await this.process();
    }
  }
  
  async process() {
    this.processing = true;
    
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (err) {
        console.error('Task failed:', err);
      }
    }
    
    this.processing = false;
  }
}

async function challenge7() {
  console.log('\n--- Challenge 7: Async Queue ---');
  
  const queue = new AsyncQueue();
  
  const task1 = async () => {
    console.log('Task 1 started');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Task 1 completed');
  };
  
  const task2 = async () => {
    console.log('Task 2 started');
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Task 2 completed');
  };
  
  const task3 = async () => {
    console.log('Task 3 started');
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Task 3 completed');
  };
  
  await queue.add(task1);
  await queue.add(task2);
  await queue.add(task3);
}

/* 
 * CHALLENGE 8: Parallel Execution with Limit
 * Execute promises in parallel but with concurrency limit
 * Difficulty: Hard
 */
async function executeWithLimit(tasks, limit) {
  // TODO: Execute tasks with max 'limit' concurrent executions
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const promise = task().then(result => {
      executing.splice(executing.indexOf(promise), 1);
      return result;
    });
    
    results.push(promise);
    executing.push(promise);
    
    if (executing.length >= limit) {
      await Promise.race(executing);
    }
  }
  
  return Promise.all(results);
}

async function challenge8() {
  console.log('\n--- Challenge 8: Parallel Execution with Limit ---');
  
  const tasks = Array.from({ length: 10 }, (_, i) => async () => {
    console.log(`Task ${i + 1} started`);
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Task ${i + 1} completed`);
    return i + 1;
  });
  
  console.log('Executing 10 tasks with concurrency limit of 3...');
  const results = await executeWithLimit(tasks, 3);
  console.log('All results:', results);
}

// RUN ALL CHALLENGES
async function runAll() {
  try {
    // Create test files
    await fs.writeFile('file1.txt', 'Content of file 1');
    await fs.writeFile('file2.txt', 'Content of file 2');
    await fs.writeFile('file3.txt', 'Content of file 3');
    
    // await challenge1();
    // await challenge2();
    await challenge3();
    await challenge4();
    await challenge5();
    await challenge6();
    await challenge7();
    await challenge8();
    
    // Cleanup
    await fs.unlink('file1.txt');
    await fs.unlink('file2.txt');
    await fs.unlink('file3.txt');
    
    console.log('\n✅ All challenges completed!');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Uncomment to run
runAll();