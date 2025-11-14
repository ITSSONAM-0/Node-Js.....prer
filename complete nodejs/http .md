const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, Node.js!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});

# Understanding the HTTP Module in Node.js

This code demonstrates how to create a simple HTTP server using Node.js’s built-in `http` module.

---

## 1. What is the `http` Module?

- The `http` module is a core Node.js module that allows you to create web servers and handle HTTP requests and responses.
- No need to install it—it's built into Node.js.

---

## 2. Creating a Server

```js
const http = require('http');
```
- This line imports the `http` module.

---

## 3. The `createServer` Method

```js
const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello, Node.js!');
});
```
- `http.createServer` creates a new HTTP server.
- The callback receives two objects:
  - `req`: The request object (contains info about the client’s request).
  - `res`: The response object (used to send data back to the client).
- `res.writeHead(200, {'Content-Type': 'text/plain'})` sets the HTTP status code and headers.
- `res.end('Hello, Node.js!')` sends the response and closes the connection.

---

## 4. Listening on a Port

```js
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```
- The server listens for incoming requests on port 3000.
- The callback runs once the server is ready.

---

## 5. How It Works

- When you visit `http://localhost:3000/` in your browser, the server responds with "Hello, Node.js!".
- You can handle different URLs and HTTP methods by inspecting `req.url` and `req.method`.

---

## 6. Interview Questions

- How do you create a basic HTTP server in Node.js?
- What are the `req` and `res` objects?
- How do you set headers and status codes in a response?
- How would you serve different content based on the request URL?

---

**Summary:**  
The `http` module is fundamental for building web servers in Node.js. Understanding how to create and configure a basic server is essential for backend development
