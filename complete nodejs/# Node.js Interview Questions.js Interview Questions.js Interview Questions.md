# Node.js Interview Questions

---

## **Basic**

### 1. What is Node.js?
Node.js is a runtime environment that allows you to run JavaScript code on the server side. It is built on Chrome’s V8 JavaScript engine and uses an event-driven, non-blocking I/O model, making it efficient and scalable for building web applications.

### 2. How is Node.js different from JavaScript in the browser?
- **Node.js** runs JavaScript on the server, while browsers run it on the client.
- Node.js provides APIs for file system, networking, and OS-level tasks, which browsers do not.
- In Node.js, there is no `window` or `document` object.

### 3. What is the event loop?
The event loop is the mechanism that allows Node.js to handle multiple operations concurrently on a single thread. It listens for events and executes callback functions, enabling non-blocking I/O.

---

## **Intermediate**

### 4. Explain streams in Node.js.
Streams are objects that let you read data from a source or write data to a destination in a continuous fashion. Types include Readable, Writable, Duplex, and Transform streams. They are used for handling large files or data flows efficiently.

### 5. What is npm?
npm (Node Package Manager) is the default package manager for Node.js. It allows you to install, share, and manage third-party packages and dependencies in your project.

### 6. How do you handle errors in Node.js?
- Use error-first callbacks: `function(err, data) { ... }`
- Use try/catch blocks with async/await.
- Listen for 'error' events on streams and event emitters.

---

## **Advanced**

### 7. How does clustering work?
Clustering allows you to create multiple Node.js processes (workers) that share the same server port. This helps utilize multi-core systems and improves performance for concurrent requests.

### 8. How do you secure a Node.js app?
- Validate and sanitize user input.
- Use HTTPS.
- Manage environment variables securely.
- Keep dependencies updated.
- Use security middleware (e.g., helmet in Express).

### 9. What is middleware in Express.js?
Middleware functions are functions that have access to the request and response objects in Express.js. They can modify requests, responses, or end the request-response cycle. Middleware is used for logging, authentication, error handling, etc.

### 10. What is the difference between process.nextTick(), setImmediate(), and setTimeout()?
- `process.nextTick()` schedules a callback to be invoked in the same phase of the event loop, before any I/O events.
- `setImmediate()` schedules a callback to execute on the next iteration of the event loop, after I/O events.
- `setTimeout()` schedules a callback after a minimum delay.

### 11. What are buffers in Node.js?
Buffers are used to handle binary data directly in memory. They are especially useful when dealing with streams, file I/O, or network protocols.

### 12. How do you create a simple REST API in Node.js?
You can use the built-in `http` module or frameworks like Express.js to create REST APIs. Example with Express:
```javascript
const express = require('express');
const app = express();
app.get('/api', (req, res) => res.send('Hello API!'));
app.listen(3000);
```

### 13. What is the purpose of the package.json file?
`package.json` manages project metadata, dependencies, scripts, and configuration for npm.

### 14. How do you manage environment variables in Node.js?
Use the `process.env` object or packages like `dotenv` to load variables from a `.env` file.

### 15. What is the difference between synchronous and asynchronous methods in Node.js?
- **Synchronous:** Blocks the event loop until the operation completes.
- **Asynchronous:** Does not block the event loop; uses callbacks, promises, or async/await.

### 16. What is a callback hell and how can you avoid it?
Callback hell is deeply nested callbacks, making code hard to read and maintain. Avoid it using Promises or async/await.

### 17. What is the role of the EventEmitter class?
`EventEmitter` allows you to create, listen for, and handle custom events in Node.js.

### 18. How do you handle uncaught exceptions in Node.js?
Use `process.on('uncaughtException', handler)` to catch exceptions not handled elsewhere, but prefer proper error handling in code.

### 19. What is CORS and how do you enable it in Node.js?
CORS (Cross-Origin Resource Sharing) allows or restricts resources to be requested from another domain. In Express, use the `cors` middleware.

### 20. How do you implement authentication in a Node.js application?
Common methods include sessions, JWT (JSON Web Tokens), OAuth, and using libraries like Passport.js.
