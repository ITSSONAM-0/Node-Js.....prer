# HTTP Module in Node.js

The `http` module is a core Node.js module that allows you to create web servers and handle HTTP requests and responses without any external dependencies. It is the foundation for frameworks like Express.

---

## 1. Creating a Basic HTTP Server

```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.end('Hello, HTTP!');
});
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

---

## 2. Handling Requests and Responses

- **Request Object (`req`):** Contains information about the HTTP request (URL, method, headers, etc.).
- **Response Object (`res`):** Used to send data back to the client.

**Example:**
```js
const server = http.createServer((req, res) => {
  if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About Page');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});
```

---

## 3. Setting Headers and Status Codes

```js
res.writeHead(200, { 'Content-Type': 'application/json' });
res.end(JSON.stringify({ message: 'Success' }));
```

---

## 4. Handling POST Data

```js
const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/data') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: body }));
    });
  }
});
```

---

## 5. Closing the Server

```js
server.close(() => {
  console.log('Server closed');
});
```

---

## Interview Problems

### 1. Create a server that returns different responses for `/`, `/about`, and any other route.

```js
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Home Page');
  } else if (req.url === '/about') {
    res.end('About Page');
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});
server.listen(3000);
```

---

### 2. How do you handle large POST data in Node.js?

- Collect data in chunks using the `data` event.
- Process the complete body in the `end` event.

---

### 3. How can you serve static files using the `http` module?

- Parse the URL, read the file from disk, and stream it to the response.
- Example (simplified):

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, req.url === '/' ? '/index.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('File not found');
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
});
server.listen(3000);
```

---

## Best Practices

- Always set appropriate headers (e.g., Content-Type).
- Handle errors gracefully.
- For production, use frameworks like Express for easier routing and middleware support.

---

The `http` module is fundamental for understanding how web servers work in Node.js and is a common topic in interviews!
