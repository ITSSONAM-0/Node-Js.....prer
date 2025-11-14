# Introduction to Node.js

Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser. It was created by Ryan Dahl in 2009 and is built on Chrome's V8 JavaScript engine.

## Why Node.js?

Traditionally, JavaScript was used only for client-side scripting in browsers. Node.js enables developers to use JavaScript for server-side programming, allowing for full-stack development with a single language.

## Key Features

- **Asynchronous and Event-Driven:** All APIs of Node.js are non-blocking, meaning server resources are not tied up waiting for operations like file or network access to complete.
- **Single-Threaded but Highly Scalable:** Node.js uses a single-threaded event loop architecture, but can handle thousands of concurrent connections efficiently.
- **Fast Execution:** Built on the V8 engine, Node.js compiles JavaScript to native machine code for fast execution.
- **Cross-Platform:** Runs on Windows, Linux, and macOS.
- **Large Ecosystem:** npm (Node Package Manager) provides access to thousands of reusable packages.

## Where is Node.js Used?

- Web servers and REST APIs
- Real-time applications (chat, gaming, collaboration tools)
- Microservices
- Command-line tools
- Streaming applications

## How Node.js Works

Node.js uses an event-driven, non-blocking I/O model. This means:
- Operations like reading files, querying databases, or making HTTP requests do not block the main thread.
- Instead, Node.js registers a callback and continues executing other code. When the operation completes, the callback is invoked.

## Example: Simple HTTP Server

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello from Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

## When to Use Node.js

- When you need to handle many concurrent connections efficiently (e.g., APIs, chat apps).
- For applications that require real-time interaction.
- When building scalable network applications.

## When Not to Use Node.js

- CPU-intensive applications (e.g., heavy computations, image processing) may not be ideal, as Node.js is single-threaded and such tasks can block the event loop.

---

Node.js has revolutionized backend development by enabling JavaScript everywhere. Its non-blocking architecture and vast ecosystem make it a popular choice for modern web development.
