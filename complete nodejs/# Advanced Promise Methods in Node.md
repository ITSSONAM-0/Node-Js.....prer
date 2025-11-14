# Advanced Promise Methods in Node.js

Node.js provides several static methods on the `Promise` object to handle multiple asynchronous operations efficiently. These are frequently asked about in interviews.

---

## 1. Promise.all

- **Purpose:** Waits for all promises to resolve. If any promise rejects, it immediately rejects.
- **Use case:** When you need all results before proceeding.

**Example:**
```js
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]).then(results => {
  console.log(results); // [1, 2, 3]
}).catch(err => {
  console.error(err);
});
```

---

## 2. Promise.race

- **Purpose:** Resolves or rejects as soon as any promise resolves or rejects.
- **Use case:** When you want the result of the fastest promise (e.g., timeout logic).

**Example:**
```js
Promise.race([
  new Promise(res => setTimeout(() => res('A'), 100)),
  new Promise(res => setTimeout(() => res('B'), 200))
]).then(result => {
  console.log(result); // 'A'
});
```

---

## 3. Promise.allSettled

- **Purpose:** Waits for all promises to settle (either fulfilled or rejected). Returns an array of result objects.
- **Use case:** When you want to know the outcome of all promises, regardless of success or failure.

**Example:**
```js
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error')
]).then(results => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 'Success' },
  //   { status: 'rejected', reason: 'Error' }
  // ]
});
```

---

## 4. Promise.any

- **Purpose:** Resolves as soon as any promise resolves. If all promises reject, it rejects with an AggregateError.
- **Use case:** When you need only one successful result.

**Example:**
```js
Promise.any([
  Promise.reject('Fail 1'),
  Promise.resolve('First Success'),
  Promise.reject('Fail 2')
]).then(result => {
  console.log(result); // 'First Success'
}).catch(err => {
  console.error(err);
});
```

---

## Interview Tips

- **Promise.all** is best when all results are required and you want to fail fast.
- **Promise.race** is useful for timeouts or picking the fastest response.
- **Promise.allSettled** is great for logging/reporting all outcomes.
- **Promise.any** is ideal when you only need one successful result, regardless of failures.

---

**Common Interview Question:**  
*What happens if one promise in Promise.all rejects?*  
> The entire Promise.all rejects immediately with that error.

*How is Promise.allSettled different from Promise.all?*  
> Promise.allSettled waits for all promises to finish, regardless of success or failure, and gives you the status of each.

---

## More Advanced Promise Interview Questions & Scenarios

---

### 1. What happens if all promises in Promise.any reject?
> `Promise.any` will reject with an `AggregateError` containing all rejection reasons.

**Example:**
```js
Promise.any([
  Promise.reject('Error 1'),
  Promise.reject('Error 2')
]).catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors); // ['Error 1', 'Error 2']
});
```
### 2. How can you implement a timeout for a promise using Promise.race?
> Combine your async operation with a timeout promise using Promise.race.
```js
function fetchWithTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Usage:
fetchWithTimeout(fetch('https://example.com'), 1000)
  .then(res => console.log('Fetched!'))
  .catch(err => console.error(err.message));
```
### 3. How do you handle partial failures with Promise.allSettled?
You can filter results to separate successes from failures.
```js
const promises = [
  Promise.resolve('Success 1'),
  Promise.reject('Error 1'),
  Promise.resolve('Success 2'),
  Promise.reject('Error 2')
];

Promise.allSettled(promises).then(results => {
  const successes = results.filter(result => result.status === 'fulfilled');
  const failures = results.filter(result => result.status === 'rejected');

  console.log('Successful Results:', successes);   // [{ status: 'fulfilled', value: 'Success 1' }, { status: 'fulfilled', value: 'Success 2' }]
  console.log('Failed Results:', failures);  // [{ status: 'rejected', reason: 'Error 1' }, { status: 'rejected', reason: 'Error 2' }]
});

Promise.allSettled([
  Promise.resolve('A'),
  Promise.reject('B'),
  Promise.resolve('C')
]).then(results => {
  const successes = results.filter(r => r.status === 'fulfilled').map(r => r.value);
  const failures = results.filter(r => r.status === 'rejected').map(r => r.reason);
  console.log('Successes:', successes); // ['A', 'C']
  console.log('Failures:', failures);   // ['B']
});
### 4. Can you use Promise.all with non-promise values?
> Yes, Promise.all can be used with non-promise values. It will treat them as resolved promises.

**Example:**
```js
Promise.all([
  Promise.resolve('A'),
  'B',
  Promise.resolve('C')
]).then(results => {
  console.log(results); // ['A', 'B', 'C']
});
### 5. How do you handle errors in Promise.all?
> If any promise in Promise.all rejects, the entire operation fails. You can catch the error using `.catch()`.
```js
Promise.all([
  Promise.resolve('A'),
  Promise.reject('B'),
  Promise.resolve('C')
]).then(results => {
  console.log(results); // This won't execute because one promise rejected
}).catch(err => {
  console.error(err);  // 'B' - the reason for rejection
});
### 6. How can you implement a retry mechanism using promises?
```js
function fetchWithRetry(url, options, retries = 3) {
  return fetch(url, options).catch(err => {
    if (retries > 0) {
      console.log(`Retrying... (${retries} left)`);
      return fetchWithRetry(url, options, retries - 1);
    }
    throw err;
  });
}
// Usage:
fetchWithRetry('https://example.com/api', { method: 'GET' })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error('Failed after retries:', err));       
```
### 7. How do you handle multiple asynchronous operations that depend on each other?
```js
function fetchData() {
  return fetch('https://example.com/api/data')
    .then(response => response.json());
}

function processData(data) {
  return new Promise((resolve, reject) => {
    // Simulate processing
    setTimeout(() => {
      if (data) {
        resolve(`Processed: ${data}`);
      } else {
        reject('No data to process');
      }
    }, 1000);
  });
}

// Chaining promises
fetchData()
  .then(data => processData(data))
  .then(result => console.log(result))
  .catch(err => console.error(err));
### 8. How can you convert a callback-based function to return a promise?
```js
function callbackBasedFunction(arg, callback) {
  setTimeout(() => {
    if (arg) {
      callback(null, `Result: ${arg}`);
    } else {
      callback('Error: No argument provided');
    }
  }, 1000);
}

// Convert to promise
function promiseBasedFunction(arg) {
  return new Promise((resolve, reject) => {
    callbackBasedFunction(arg, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Usage
promiseBasedFunction('Test')
  .then(result => console.log(result))
  .catch(err => console.error(err));            
```
