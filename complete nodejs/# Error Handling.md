# Error Handling in Node.js

Error handling is crucial in Node.js because many operations are asynchronous and failures can occur at any time (e.g., file not found, network issues, invalid input).

---

## 1. Error-First Callbacks

Most Node.js APIs use the error-first callback pattern:
- The first argument is always the error (if any), followed by the result.
- Always check for errors before using the result.

**Example:**
```js
const fs = require('fs');
fs.readFile('notfound.txt', (err, data) => {
  if (err) {
    console.error('Error:', err.message);
    return;
  }
  console.log(data.toString());
});
```

---

## 2. try/catch with Async/Await

When using `async/await`, wrap your code in a `try/catch` block to handle errors.

**Example:**
```js
const fs = require('fs').promises;
async function readFile() {
  try {
    const data = await fs.readFile('notfound.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}
readFile();
```

---

## 3. Error Events

Some objects (like streams and EventEmitters) emit `'error'` events. Always listen for these to prevent crashes.

**Example:**
```js
const fs = require('fs');
const stream = fs.createReadStream('notfound.txt');
stream.on('error', err => {
  console.error('Stream error:', err.message);
});
```

---

## 4. Uncaught Exceptions

If an error is not handled, it can crash your application. You can listen for uncaught exceptions, but it's better to handle errors where they occur.

**Example:**
```js
process.on('uncaughtException', err => {
  console.error('Uncaught Exception:', err);
  process.exit(1); // Always exit after an uncaught exception
});
```

---

## Best Practices

- Always handle errors in callbacks and promises.
- Use `try/catch` with `async/await`.
- Listen for `'error'` events on streams and emitters.
- Never ignore errors—log them and handle them appropriately.
- Avoid using `process.on('uncaughtException')` for normal error handling; use it only as a last resort.

---

Proper error handling makes your application more robust and easier to debug. By following these guidelines, you'll be better equipped to handle the inevitable errors that arise in asynchronous programming.
