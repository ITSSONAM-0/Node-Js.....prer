# Understanding Asynchronous Tasks with Callbacks in Node.js

This code demonstrates a fundamental concept in Node.js: **asynchronous programming using callbacks**.

---

## 1. What is a Callback?

A **callback** is a function passed as an argument to another function, to be executed later—often after an asynchronous operation completes.

---

## 2. How Does the Example Work?

```js
function asyncTask(callback) {
  setTimeout(() => {
    callback('Task complete!');
  }, 1000);
}

asyncTask((message) => {
  console.log(message);
});
```

- `asyncTask` takes a callback function as its parameter.
- Inside `asyncTask`, `setTimeout` simulates an asynchronous operation (like reading a file or making a network request).
- After 1 second, the callback is called with the message `'Task complete!'`.
- When you call `asyncTask`, you provide a function that logs the message.

---

## 3. Why Use Callbacks?

- **Non-blocking:** Node.js can handle other tasks while waiting for the async operation to finish.
- **Essential for I/O:** Most Node.js APIs use callbacks for file, network, and database operations.

---

## 4. Callback Hell

When callbacks are nested within callbacks, code can become hard to read and maintain. This is called "callback hell."  
**Example:**
```js
asyncTask((msg1) => {
  asyncTask((msg2) => {
    asyncTask((msg3) => {
      console.log(msg1, msg2, msg3);
    });
  });
});
```
**Solution:** Use Promises or async/await for better readability.

---

## 5. Interview Questions

- What is a callback function?
- How does asynchronous code differ from synchronous code in Node.js?
- What is callback hell and how can you avoid it?
- How would you convert a callback-based function to use Promises?

---

## 6. Best Practices

- Always handle errors in callbacks (Node.js convention: `function(err, data) { ... }`).
- Avoid deeply nested callbacks—prefer Promises or async/await for complex flows.

---

**Summary:**  
Callbacks are the foundation of asynchronous programming in Node.js. Understanding them is essential for working with Node.js APIs and building scalable, non-blocking applications.
