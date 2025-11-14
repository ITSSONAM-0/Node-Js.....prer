# Asynchronous Programming in Node.js

Asynchronous programming is a core concept in Node.js, allowing it to handle many operations (like file I/O, network requests, or database queries) without blocking the main thread. This is crucial for building scalable and high-performance applications.

---

## Why Asynchronous?

- **Non-blocking:** Node.js can process other tasks while waiting for I/O operations to complete.
- **Efficient:** Handles thousands of concurrent connections with a single thread.
- **Responsive:** Keeps applications fast and responsive, even under heavy load.

---

## Main Methods

### 1. **Callbacks**
A function passed as an argument to another function, executed after an operation completes.

**Example:**
```js
const fs = require('fs');
fs.readFile('file.txt', (err, data) => {
  if (err) return console.error(err);
  console.log(data.toString());
});
```
**Drawback:** Can lead to "callback hell" (deeply nested callbacks).

---

### 2. **Promises**
An object representing the eventual completion (or failure) of an asynchronous operation.

**Example:**
```js
const fs = require('fs').promises;
fs.readFile('file.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

### 3. **Async/Await**
Syntactic sugar over promises, making asynchronous code look synchronous.

**Example:**
```js
const fs = require('fs').promises;
async function readFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
readFile();
```

---

## Common Interview Problems

### 1. **Explain callback hell and how to avoid it.**
- **Callback hell** occurs when callbacks are nested within other callbacks, making code hard to read and maintain.
- **Avoid it** by using named functions, promises, or async/await.

### 2. **Write a function that reads two files asynchronously and prints their contents in order.**
```js
const fs = require('fs').promises;
async function readFiles() {
  try {
    const data1 = await fs.readFile('file1.txt', 'utf8');
    const data2 = await fs.readFile('file2.txt', 'utf8');
    console.log(data1);
    console.log(data2);
  } catch (err) {
    console.error(err);
  }
}
readFiles();
```

### 3. **What happens if you forget to handle errors in async code?**
- Unhandled errors can crash your application or cause unexpected behavior.
- Always use `.catch()` with promises or `try/catch` with async/await.

### 4. **How do you run multiple async operations in parallel and wait for all to finish?**
- Use `Promise.all()`:
```js
const fs = require('fs').promises;
Promise.all([
  fs.readFile('file1.txt', 'utf8'),
  fs.readFile('file2.txt', 'utf8')
]).then(([data1, data2]) => {
  console.log(data1, data2);
}).catch(console.error);
```

---

## Summary

Asynchronous programming is essential in Node.js for building fast, scalable apps. Master callbacks, promises, and async/await, and always handle errors properly!
