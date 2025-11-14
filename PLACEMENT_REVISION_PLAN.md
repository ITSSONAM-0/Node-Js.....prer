#  Node.js Placement Revision Plan


---

##  MOST ASKED TOPICS (Startups Focus)

### 1. **Event Loop** (85% chance of being asked)
### 2. **Async Programming** (90% chance)
### 3. **REST API Creation** (with Express - 95% chance)
### 4. **Error Handling** (75% chance)
### 5. **File Operations** (60% chance)
### 6. **Middleware in Express** (80% chance for MERN devs)
### 7. **Authentication** (JWT, Sessions - 70% chance)

---

##  CONNECTION TO YOUR MERN STACK

### **React (Frontend) ↔ Node.js (Backend)**
```
React Component → API Call → Express Route → Node.js Logic → MongoDB
```

**Example Flow:**
```javascript
// React Frontend
fetch('/api/users')
  .then(res => res.json())
  .then(data => setUsers(data));

// Node.js Backend (Express)
app.get('/api/users', async (req, res) => {
  const users = await User.find(); // MongoDB
  res.json(users);
});
```

---

##  RAPID FIRE PRACTICE QUESTIONS

### **Level 1: Quick Questions (30 seconds each)**
1. What is Node.js? Why use it?
2. Is Node.js single-threaded? Explain.
3. What is npm? What is package.json?
4. Difference between `require` and `import`?
5. What are callbacks?

### **Level 2: Conceptual (1-2 minutes each)**
1. Explain the Event Loop with diagram
2. Callback hell - what and how to avoid?
3. What are streams? When to use them?
4. Difference between `process.nextTick()` and `setImmediate()`?
5. How does middleware work in Express?

### **Level 3: Coding Problems (5-10 minutes each)**
1. Create a REST API with GET, POST, PUT, DELETE
2. Read a large file using streams
3. Implement JWT authentication
4. Handle multiple async operations with Promise.all
5. Error handling in async/await

---

## 🛠️ HANDS-ON CODING CHALLENGES

### **Challenge 1: File Operations**
**Problem:** Read all `.txt` files in a directory and merge their content into one file.

**Skills tested:** fs module, async/await, error handling

---

### **Challenge 2: REST API**
**Problem:** Create an Express API for a TODO app with:
- GET /todos (get all)
- POST /todos (create new)
- PUT /todos/:id (update)
- DELETE /todos/:id (delete)

**Skills tested:** Express, routing, middleware, error handling

---

### **Challenge 3: Promise Mastery**
**Problem:** Fetch data from 3 APIs simultaneously. If any fails, continue with others.

**Hint:** Use `Promise.allSettled()`

---

### **Challenge 4: Authentication**
**Problem:** Implement a simple JWT-based login system with protected routes.

**Skills tested:** JWT, middleware, security

---

### **Challenge 5: Streams**
**Problem:** Copy a 1GB file without loading it into memory.

**Skills tested:** Readable/Writable streams, pipe

---

## 🎤 COMMON INTERVIEW SCENARIOS

### **Scenario 1: "Explain your MERN project"**
**What they want to hear:**
- How you structured the backend (Express routes, controllers, models)
- How you handled authentication (JWT/Sessions)
- Database design (MongoDB schemas)
- Error handling & validation
- API design (RESTful principles)

---

### **Scenario 2: "How would you optimize a slow API?"**
**Answer points:**
1. Database indexing
2. Caching (Redis)
3. Pagination for large datasets
4. Use streams for large files
5. Async operations (don't block event loop)
6. Connection pooling

---

### **Scenario 3: "How do you handle errors in production?"**
**Answer points:**
1. Try/catch with async/await
2. Error middleware in Express
3. Logging (Winston, Morgan)
4. Process error handlers (uncaughtException, unhandledRejection)
5. Never expose stack traces to clients
6. Use HTTP status codes properly

---

## 🧠 QUICK REVISION CHEATSHEET

### **Event Loop Phases:**
```
   ┌───────────────────────────┐
┌─>│           timers          │ (setTimeout, setInterval)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ (I/O operations)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ (setImmediate)
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

### **Promise Methods:**
| Method | Behavior | Use Case |
|--------|----------|----------|
| `Promise.all` | All must succeed | Fetch multiple required resources |
| `Promise.race` | First to finish wins | Timeout implementation |
| `Promise.allSettled` | Wait for all (success or fail) | Logging/reporting all results |
| `Promise.any` | First success wins | Try multiple sources, need one |

### **Common HTTP Status Codes:**
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🎯 TOP 15 MUST-KNOW QUESTIONS (For Your Target Companies)

1. **What is Node.js and why is it popular?**
2. **Explain the Event Loop**
3. **Callback vs Promise vs Async/Await**
4. **How does require() work?**
5. **What is middleware in Express?**
6. **How do you handle errors in Node.js?**
7. **Explain REST API principles**
8. **What are streams? Give an example**
9. **How do you secure a Node.js app?**
10. **Explain JWT authentication**
11. **What is CORS? How to handle it?**
12. **Difference between process.nextTick() and setImmediate()?**
13. **How do you handle environment variables?**
14. **What is npm? What is package-lock.json?**
15. **How do you debug Node.js applications?**


---
