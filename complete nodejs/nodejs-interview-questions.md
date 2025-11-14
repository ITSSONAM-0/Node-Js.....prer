# Node.js Interview Questions and Answers

A comprehensive list of Node.js interview questions with detailed explanations, commonly asked in technical interviews.

---

## 1. What is Node.js?  
**Answer:**  
Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. It is built on Chrome's V8 engine and is designed for building scalable network applications using an event-driven, non-blocking I/O model.

---

## 2. How does Node.js handle asynchronous operations?  
**Answer:**  
Node.js uses an event-driven, non-blocking I/O model. Asynchronous operations are handled using callbacks, Promises, or async/await. The event loop allows Node.js to perform non-blocking I/O operations by offloading operations to the system kernel whenever possible.

---

## 3. What is the Event Loop in Node.js?  
**Answer:**  
The event loop is the mechanism that allows Node.js to handle multiple concurrent operations without multiple threads. It listens for events and executes callback functions. The event loop has several phases (timers, I/O callbacks, idle, poll, check, close callbacks) and processes callbacks in each phase.

---

## 4. Explain the difference between process.nextTick(), setImmediate(), and setTimeout().  
**Answer:**  
- `process.nextTick()`: Executes the callback after the current operation completes, before the event loop continues.
- `setImmediate()`: Executes the callback on the next iteration of the event loop.
- `setTimeout()`: Executes the callback after at least the specified delay.

---

## 5. What are streams in Node.js?  
**Answer:**  
Streams are objects that let you read data from a source or write data to a destination in a continuous fashion. Types include Readable, Writable, Duplex, and Transform streams. They are used for handling large files or data flows efficiently.

---

## 6. What is the difference between synchronous and asynchronous methods in Node.js?  
**Answer:**  
- **Synchronous methods** block the execution of code until the operation completes.
- **Asynchronous methods** allow the program to continue executing while the operation completes in the background, using callbacks or Promises.

---

## 7. What is npm?  
**Answer:**  
npm (Node Package Manager) is the default package manager for Node.js. It is used to install, share, and manage dependencies (libraries and tools) in Node.js projects.

---

## 8. How do you handle errors in Node.js?  
**Answer:**  
- Use error-first callbacks (`function(err, data) { ... }`).
- Use try/catch with async/await.
- Listen for 'error' events on streams and event emitters.
- Handle uncaught exceptions with `process.on('uncaughtException', handler)` (as a last resort).

---

## 9. What are modules in Node.js?  
**Answer:**  
Modules are reusable blocks of code. Node.js supports CommonJS modules (`require`, `module.exports`) and ES Modules (`import`, `export`). Built-in modules include `fs`, `http`, `path`, etc.

---

## 10. What is middleware in Express.js?  
**Answer:**  
Middleware functions are functions that have access to the request and response objects in Express.js. They can modify requests, responses, or end the request-response cycle. Middleware is used for logging, authentication, error handling, etc.

---

## 11. How do you manage environment variables in Node.js?  
**Answer:**  
Environment variables are accessed via `process.env`. You can use packages like `dotenv` to load variables from a `.env` file.

---

## 12. What is clustering in Node.js?  
**Answer:**  
Clustering allows you to create child processes (workers) that share the same server port. This helps utilize multi-core systems and improves performance for concurrent requests.

---

## 13. What is the purpose of the package.json file?  
**Answer:**  
`package.json` manages project metadata, dependencies, scripts, and configuration for npm.

---

## 14. What is the difference between Promise.all, Promise.race, Promise.allSettled, and Promise.any?  
**Answer:**  
- **Promise.all:** Resolves when all promises resolve; rejects if any promise rejects.
- **Promise.race:** Resolves or rejects as soon as any promise resolves or rejects.
- **Promise.allSettled:** Resolves after all promises settle (either fulfilled or rejected), returns their results.
- **Promise.any:** Resolves as soon as any promise resolves; rejects only if all promises reject.

---

## 15. How do you secure a Node.js application?  
**Answer:**  
- Validate and sanitize user input.
- Use HTTPS.
- Manage environment variables securely.
- Keep dependencies updated.
- Use security middleware (e.g., helmet in Express).
- Avoid exposing sensitive information.

---

## 16. How do you implement authentication in Node.js?  
**Answer:**  
Common methods include sessions, JWT (JSON Web Tokens), OAuth, and using libraries like Passport.js.

---

## 17. What is CORS and how do you enable it in Node.js?  
**Answer:**  
CORS (Cross-Origin Resource Sharing) allows or restricts resources to be requested from another domain. In Express, use the `cors` middleware.

---

## 18. How do you convert a callback-based function to return a Promise?  
**Answer:**  
By using the `Promise` constructor or `util.promisify` in Node.js.

**Example:**
```js
const util = require('util');
const fs = require('fs');
const readFilePromise = util.promisify(fs.readFile);
readFilePromise('test.txt', 'utf8').then(console.log);
```

---

## 19. What is the role of the EventEmitter class?  
**Answer:**  
`EventEmitter` allows you to create, listen for, and handle custom events in Node.js.

---

## 20. What is callback hell and how can you avoid it?  
**Answer:**  
Callback hell is deeply nested callbacks, making code hard to read and maintain. Avoid it using Promises or async/await.

---

## 21. How do you handle large file uploads in Node.js?  
**Answer:**  
Use streams to process files in chunks, avoiding loading the entire file into memory.

---

## 22. How do you serve static files in Node.js?  
**Answer:**  
You can use the `fs` module to read files and send them in the response, or use Express’s `express.static` middleware.

---

## 23. What is backpressure in streams?  
**Answer:**  
Backpressure occurs when the writable stream cannot process data as fast as the readable stream provides it. Node.js handles this internally, but you can listen for the `drain` event and use `stream.write()`'s return value to manage flow manually.

---

## 24. How do you handle uncaught exceptions in Node.js?  
**Answer:**  
Use `process.on('uncaughtException', handler)` to catch exceptions not handled elsewhere, but prefer proper error handling in code.

---

## 25. What is the difference between process.env.NODE_ENV = 'development' and 'production'?  
**Answer:**  
`NODE_ENV` is used to set the environment mode. In production, you may enable optimizations, disable debugging, and use different configurations.

---
