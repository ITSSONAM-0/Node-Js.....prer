

##  MUST-MEMORIZE DEFINITIONS

### **Node.js**
> "JavaScript runtime environment that runs outside the browser, built on V8 engine, uses event-driven non-blocking I/O for building scalable server applications."

### **Event Loop**
> "Mechanism that handles async operations by continuously checking task queues (timers, I/O, callbacks) and executing them in phases, allowing single-threaded JavaScript to handle many operations."

### **Callback**
> "Function passed as argument to another function, executed after an operation completes. First argument is usually error (error-first pattern)."

### **Promise**
> "Object representing eventual completion or failure of async operation. Has three states: pending, fulfilled, rejected. Use .then() and .catch() to handle results."

### **Async/Await**
> "Syntactic sugar over Promises. Makes async code look synchronous. Always use try-catch for error handling."

### **Middleware**
> "Functions with access to req, res, and next. Execute code, modify req/res, end cycle, or call next middleware. Used for logging, auth, validation."

### **Streams**
> "Collections of data processed in chunks rather than all at once. Four types: Readable, Writable, Duplex, Transform. Memory-efficient for large files."

### **Module**
> "Reusable code blocks. Three types: built-in (fs, http), user-defined (your files), third-party (npm packages). Use require() or import."

---

## 💬 CONVERSATIONAL ANSWERS (Copy These!)

### **Q: "Why did you choose Node.js for your project?"**

**Template Answer:**
> "I chose Node.js for three main reasons:
> 1. **JavaScript everywhere** - Same language for frontend (React) and backend, making development faster
> 2. **Performance** - Non-blocking I/O handles multiple API requests efficiently
> 3. **Ecosystem** - npm provides ready-made packages for authentication, validation, etc.
> 
> In my [project name], it handles [specific feature] with [X] concurrent users smoothly."

---

### **Q: "Explain the difference between npm and npx"**

**Template Answer:**
> "npm is the package manager - it installs packages locally or globally.
> npx is a package runner - it executes packages without installing them globally.
> 
> Example:
> - `npm install -g create-react-app` → installs globally (takes disk space)
> - `npx create-react-app my-app` → runs latest version without installing
> 
> I use npx for one-time commands and npm for project dependencies."

---

### **Q: "How does require() work internally?"**

**Template Answer:**
> "When you call require('./file'), Node.js does 5 steps:
> 1. **Resolving** - Finds file path
> 2. **Loading** - Reads file content
> 3. **Wrapping** - Wraps in function with (exports, require, module, __filename, __dirname)
> 4. **Executing** - Runs the function
> 5. **Caching** - Stores result for future requires
> 
> That's why requiring same module multiple times returns cached version."

---

### **Q: "What's the difference between dependencies and devDependencies?"**

**Template Answer:**
> "**dependencies** are packages needed to run the app in production (express, mongoose).
> **devDependencies** are only needed during development (nodemon, jest).
> 
> ```json
> {
>   "dependencies": { "express": "^4.18.0" },
>   "devDependencies": { "nodemon": "^2.0.0" }
> }
> ```
> 
> When deploying, you run `npm install --production` which skips devDependencies, keeping deployment lean."

---

### **Q: "How do you handle errors in Express?"**

**Template Answer:**
> "I use a multi-layer approach:
> 
> 1. **Route-level** try-catch:
> ```javascript
> app.get('/users/:id', async (req, res, next) => {
>   try {
>     const user = await User.findById(req.params.id);
>     res.json(user);
>   } catch (error) {
>     next(error); // Pass to error handler
>   }
> });
> ```
> 
> 2. **Global error middleware** (must have 4 parameters):
> ```javascript
> app.use((err, req, res, next) => {
>   console.error(err.stack);
>   res.status(err.status || 500).json({
>     error: process.env.NODE_ENV === 'production' 
>       ? 'Something went wrong' 
>       : err.message
>   });
> });
> ```
> 
> This ensures no error crashes the server."

---

### **Q: "Explain process.nextTick() vs setImmediate()"**

**Template Answer:**
> "Both schedule callbacks, but at different times:
> 
> **process.nextTick():**
> - Executes BEFORE next event loop phase
> - Highest priority
> - Can block event loop if overused
> 
> **setImmediate():**
> - Executes in CHECK phase of event loop
> - Designed for I/O operations
> - Better for avoiding blocking
> 
> ```javascript
> setImmediate(() => console.log('setImmediate')); // 2nd
> process.nextTick(() => console.log('nextTick'));  // 1st
> ```
> 
> I use setImmediate() for I/O callbacks to avoid blocking."

---

## 🎨 VISUAL EXPLANATIONS (Draw These!)

### **Event Loop Diagram (Draw on Whiteboard)**

```
┌───────────────────────────┐
│    JavaScript Code        │
│   (Your Application)      │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│      Call Stack           │ ← Executes synchronous code
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│      Event Loop           │
│  ┌─────────────────────┐  │
│  │  1. Timers          │  │ ← setTimeout, setInterval
│  │  2. I/O Callbacks   │  │
│  │  3. Poll            │  │ ← Database, File System
│  │  4. Check           │  │ ← setImmediate
│  │  5. Close           │  │
│  └─────────────────────┘  │
└───────────┬───────────────┘
            │
            ▼
┌───────────────────────────┐
│   Callback Queue          │
└───────────────────────────┘
```

---

### **Request-Response Flow (For MERN Questions)**

```
Browser (React)
    │
    │ HTTP Request (fetch/axios)
    ▼
Node.js Server (Express)
    │
    ├─→ Middleware (auth, logging)
    │
    ├─→ Route Handler
    │      │
    │      ├─→ Validation
    │      │
    │      ├─→ Business Logic
    │      │
    │      └─→ Database Query (MongoDB)
    │              │
    │              ▼
    │         Mongoose Model
    │              │
    │              ▼
    ▼         MongoDB
Response (JSON)
    │
    ▼
Browser (React updates state)
```

---

## 🗣️ SCRIPT FOR LIVE CODING

### **When Asked to Code an API Endpoint**

**Speak this out loud WHILE typing:**

```javascript
// "I'll create a POST endpoint for user registration"
app.post('/register', async (req, res) => {
  
  // "First, I'll destructure and validate the input"
  const { email, password, name } = req.body;
  
  if (!email || !password || !name) {
    // "Return 400 if validation fails"
    return res.status(400).json({ error: 'All fields required' });
  }
  
  // "Wrap in try-catch for error handling"
  try {
    // "Check if user already exists"
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    
    // "Hash the password using bcrypt for security"
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // "Create new user in database"
    const user = await User.create({
      email,
      password: hashedPassword,
      name
    });
    
    // "Generate JWT token for authentication"
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    // "Return success response with token"
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, email, name }
    });
    
  } catch (error) {
    // "Log error and return 500 status"
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
```

**Key phrases to use:**
- ✅ "First, I'll..."
- ✅ "Now I need to..."
- ✅ "For security, I'll..."
- ✅ "To handle errors, I'm using..."
- ✅ "This returns..."

---

## 🎯 BEHAVIORAL QUESTIONS (Non-Technical)

### **Q: "Tell me about a challenging bug you fixed"**

**Template (STAR Method):**

**Situation:** "In my [project name], users were getting inconsistent data..."

**Task:** "I needed to find why some API calls returned stale data..."

**Action:** "I debugged using console.logs and found that we weren't awaiting a Promise. I added async/await and implemented proper error handling..."

**Result:** "Bug was fixed, and I added tests to prevent similar issues. Learned the importance of always awaiting Promises."

---

### **Q: "How do you stay updated with Node.js?"**

✅ **Good Answer:**
> "I follow multiple sources:
> - Official Node.js blog for updates
> - Dev.to and Medium for tutorials
> - GitHub trending for popular packages
> - Actually building projects - that's where real learning happens
> 
> Recently I learned about [new feature] and tried it in [personal project]."

---

### **Q: "Why should we hire you?"**

✅ **Template:**
> "I bring three key strengths:
> 1. **Solid MERN stack experience** - I've built [X] projects with real-world features like auth, file uploads, payments
> 2. **Problem-solving mindset** - I don't just code, I understand WHY things work
> 3. **Quick learner** - I can pick up new technologies fast, as I did with [example]
> 
> I'm excited about this role because [company-specific reason]."

---

## ⚡ RAPID FIRE ANSWERS (10 seconds each)

### **Q: What is NPM?**
> "Node Package Manager - installs and manages JavaScript packages."

### **Q: What is package.json?**
> "Manifest file with project metadata, dependencies, and scripts."

### **Q: Sync vs Async?**
> "Sync blocks execution, async doesn't - uses callbacks/promises."

### **Q: What is Express?**
> "Minimal web framework for Node.js to build APIs and web apps."

### **Q: What is CORS?**
> "Cross-Origin Resource Sharing - allows/restricts API access from different domains."

### **Q: What is JWT?**
> "JSON Web Token - secure way to transmit information between parties, used for auth."

### **Q: What is REST API?**
> "Architectural style using HTTP methods (GET, POST, PUT, DELETE) for CRUD operations."

### **Q: What is MongoDB?**
> "NoSQL database that stores data in JSON-like documents, pairs well with Node.js."

### **Q: What is Mongoose?**
> "ODM (Object Data Modeling) library for MongoDB in Node.js - provides schemas and validation."

### **Q: What is dotenv?**
> "Package to load environment variables from .env file into process.env."


---

## 🎯 TOP 10 CODE SNIPPETS TO MEMORIZE

### **1. Basic Express Server**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### **2. Async/Await with Error Handling**
```javascript
async function fetchUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
```

### **3. Middleware Function**
```javascript
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.use(logger);
```

### **4. Authentication Middleware**
```javascript
function isAuthenticated(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}
```

### **5. Error Handler Middleware**
```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});
```

### **6. File Reading with Streams**
```javascript
const fs = require('fs');
const stream = fs.createReadStream('file.txt');
stream.on('data', chunk => console.log(chunk));
stream.on('end', () => console.log('Done'));
stream.on('error', err => console.error(err));
```

### **7. Promise.all for Parallel Operations**
```javascript
async function fetchAll() {
  const [users, posts, comments] = await Promise.all([
    User.find(),
    Post.find(),
    Comment.find()
  ]);
  return { users, posts, comments };
}
```

### **8. Creating a Module**
```javascript
// math.js
function add(a, b) {
  return a + b;
}

module.exports = { add };

// app.js
const { add } = require('./math');
console.log(add(2, 3)); // 5
```

### **9. Environment Variables**
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
```

### **10. Basic CRUD Route**
```javascript
// Create
app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Read
app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// Update
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true }
  );
  res.json(user);
});

// Delete
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});
```

---
