#  Top 30 Node.js Interview Questions & Answers

---

##  SECTION 1: FUNDAMENTALS (Questions 1-10)

### **Q1: What is Node.js? Why would you use it?**

**Model Answer:**
"Node.js is a JavaScript runtime built on Chrome's V8 engine that allows us to run JavaScript on the server side. I use it because:
1. **Single Language** - I can use JavaScript for both frontend (React) and backend, which is perfect for full-stack development
2. **Non-blocking I/O** - It handles multiple concurrent connections efficiently, ideal for APIs and real-time apps
3. **Large Ecosystem** - npm provides thousands of packages
4. **Fast Execution** - V8 engine compiles JS to machine code

In my MERN projects, I've used Node.js to build REST APIs that communicate with MongoDB and serve my React frontend."

**Why this answer works:** Shows practical experience + connects to MERN stack

---

### **Q2: Explain the Event Loop in Node.js**

**Model Answer:**
"The Event Loop is Node.js's way of handling asynchronous operations without blocking. Here's how it works:

1. **Call Stack** executes synchronous code
2. When async operations (like file read, HTTP request) are encountered, they're offloaded to the system
3. When complete, callbacks are placed in the **Callback Queue**
4. The **Event Loop** checks if Call Stack is empty, then moves callbacks from queue to stack

**Example:**
```javascript
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2
```

Even with 0ms timeout, '2' prints last because setTimeout's callback goes through the Event Loop."

**Visual:**
```
Call Stack → Empty? → Event Loop → Callback Queue → Execute
```

---

### **Q3: Difference between Callback, Promise, and Async/Await?**

**Model Answer:**
"These are three ways to handle asynchronous operations:

**1. Callback** (Old way):
```javascript
fs.readFile('file.txt', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});
```
**Problem:** Callback hell with nested operations

**2. Promise** (Better):
```javascript
fs.promises.readFile('file.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```
**Benefit:** Chainable, cleaner error handling

**3. Async/Await** (Best - What I use):
```javascript
async function readFile() {
  try {
    const data = await fs.promises.readFile('file.txt');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```
**Benefit:** Looks synchronous, easy to read and maintain

In my projects, I use async/await for all database operations and API calls."

---

### **Q4: What is middleware in Express? Give an example.**

**Model Answer:**
"Middleware functions have access to request and response objects and can:
1. Execute code
2. Modify req/res objects
3. End request-response cycle
4. Call next middleware

**Example - Authentication Middleware:**
```javascript
// I use this pattern in my MERN projects
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user to request
    next(); // Continue to next middleware/route
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Usage
app.get('/api/profile', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});
```

This protects routes - only authenticated users can access them."

---

### **Q5: How do you handle errors in Node.js?**

**Model Answer:**
"I use multiple strategies depending on the scenario:

**1. Try/Catch with Async/Await:**
```javascript
async function getUser(id) {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.error('Database error:', err);
    throw err; // Re-throw for upper layer to handle
  }
}
```

**2. Error Middleware in Express:**
```javascript
// Always at the end of all routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});
```

**3. Promise Rejection Handler:**
```javascript
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Log to monitoring service
  process.exit(1);
});
```

**Best Practice:** Never expose error stack traces to clients in production."

---

### **Q6: What is the difference between require() and import?**

**Model Answer:**
"These are two different module systems:

**require() - CommonJS (Default in Node.js):**
```javascript
// Synchronous loading
const express = require('express');
const { add } = require('./math');

// Can be conditional
if (condition) {
  const module = require('./module');
}
```

**import - ES Modules:**
```javascript
// Asynchronous loading
import express from 'express';
import { add } from './math.js';

// Must be at top level
// Can't be conditional
```

**To use ES Modules in Node.js:**
1. Use `.mjs` extension, OR
2. Add `"type": "module"` in package.json

**In my projects:** I use require() for Node.js backend and import for React frontend."

---

### **Q7: Explain package.json and package-lock.json**

**Model Answer:**
"**package.json:**
- Project metadata (name, version, description)
- Dependencies (packages needed to run the app)
- DevDependencies (packages needed only for development)
- Scripts (custom commands)

```json
{
  "name": "my-api",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

**package-lock.json:**
- Auto-generated, DON'T edit manually
- Locks exact versions of all dependencies (including nested ones)
- Ensures everyone on the team has the same versions
- Critical for production consistency

**Caret (^) vs Tilde (~):**
- `^4.18.0` - Install 4.x.x (any minor/patch update)
- `~4.18.0` - Install 4.18.x (only patch updates)"

---

### **Q8: What are streams? When would you use them?**

**Model Answer:**
"Streams process data in chunks instead of loading everything into memory. Perfect for large files!

**Types:**
1. **Readable** - Read data (file read)
2. **Writable** - Write data (file write)
3. **Duplex** - Both read and write (TCP socket)
4. **Transform** - Modify data while streaming (compression)

**Example - Copy large file efficiently:**
```javascript
const fs = require('fs');

// ❌ Bad: Loads entire file into memory
const data = fs.readFileSync('large-video.mp4');
fs.writeFileSync('copy.mp4', data);

// ✅ Good: Streams in chunks
const readStream = fs.createReadStream('large-video.mp4');
const writeStream = fs.createWriteStream('copy.mp4');
readStream.pipe(writeStream);
```

**Use cases:**
- File uploads/downloads
- Video/audio streaming
- Processing large datasets
- Real-time data processing"

---

### **Q9: How do you secure a Node.js application?**

**Model Answer:**
"Security is critical, especially in startups. Here's what I implement:

**1. Input Validation:**
```javascript
const validator = require('validator');

if (!validator.isEmail(email)) {
  return res.status(400).json({ error: 'Invalid email' });
}
```

**2. Environment Variables (never hardcode secrets):**
```javascript
require('dotenv').config();
const SECRET = process.env.JWT_SECRET; // Not in code!
```

**3. Helmet (Security headers):**
```javascript
const helmet = require('helmet');
app.use(helmet()); // Protects against common vulnerabilities
```

**4. Rate Limiting:**
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Max 100 requests per IP
});
app.use('/api/', limiter);
```

**5. JWT for Authentication:**
- Never store sensitive data in JWT
- Use HTTPS in production
- Set token expiration

**6. SQL Injection Protection:**
- Use parameterized queries
- Validate all user input"

---

### **Q10: What is CORS? How do you handle it?**

**Model Answer:**
"CORS (Cross-Origin Resource Sharing) controls whether browsers allow requests from different domains.

**Problem:**
If my React app runs on `http://localhost:3000` and API on `http://localhost:5000`, browser blocks requests by default.

**Solution in Express:**
```javascript
const cors = require('cors');

// Option 1: Allow all origins (development only)
app.use(cors());

// Option 2: Specific origins (production)
app.use(cors({
  origin: 'https://myapp.com',
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Option 3: Dynamic (multiple frontends)
const allowedOrigins = ['https://app1.com', 'https://app2.com'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  }
}));
```

**In my MERN projects:** I allow localhost in dev, production domain in deployment."

---

##  SECTION 2: INTERMEDIATE (Questions 11-20)

### **Q11: Explain process.nextTick() vs setImmediate() vs setTimeout()**

**Model Answer:**
```javascript
console.log('1');
process.nextTick(() => console.log('2'));
setImmediate(() => console.log('3'));
setTimeout(() => console.log('4'), 0);
console.log('5');

// Output: 1, 5, 2, 4, 3
```

**Explanation:**
- **Synchronous code** (1, 5) runs first
- **process.nextTick()** executes after current operation, before Event Loop continues
- **setTimeout()** executes in timers phase of Event Loop
- **setImmediate()** executes in check phase (after poll phase)

**Use cases:**
- `process.nextTick()` - When you need something to run before any I/O
- `setImmediate()` - When you want to run after I/O events
- `setTimeout()` - When you need a specific delay"

---

### **Q12: How do you implement JWT authentication?**

**Model Answer:**
```javascript
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// 1. Register User
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save user to database
  const user = await User.create({ email, password: hashedPassword });
  
  res.status(201).json({ message: 'User created' });
});

// 2. Login & Generate Token
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Verify password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Generate JWT
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token });
});

// 3. Protected Route
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.userId);
  res.json({ user });
});
```

**I use this pattern in all my MERN projects for user authentication.**"

---

### **Q13: What is callback hell? How do you avoid it?**

**Model Answer:**
"Callback hell is when callbacks are nested inside callbacks, making code unreadable:

**❌ Callback Hell:**
```javascript
getData((err, data) => {
  if (err) return handleError(err);
  processData(data, (err, processed) => {
    if (err) return handleError(err);
    saveData(processed, (err, result) => {
      if (err) return handleError(err);
      sendEmail(result, (err, sent) => {
        if (err) return handleError(err);
        console.log('Done!');
      });
    });
  });
});
```

**✅ Solution 1: Promises**
```javascript
getData()
  .then(data => processData(data))
  .then(processed => saveData(processed))
  .then(result => sendEmail(result))
  .then(() => console.log('Done!'))
  .catch(handleError);
```

**✅ Solution 2: Async/Await (Best)**
```javascript
async function workflow() {
  try {
    const data = await getData();
    const processed = await processData(data);
    const result = await saveData(processed);
    await sendEmail(result);
    console.log('Done!');
  } catch (err) {
    handleError(err);
  }
}
```

**This is why I always use async/await in my projects.**"

---

### **Q14: How does Node.js handle multiple requests with a single thread?**

**Model Answer:**
"Node.js is single-threaded but uses non-blocking I/O to handle thousands of concurrent connections:

**How it works:**
1. Request comes in → Handled by Event Loop
2. If it's I/O operation (database, file, network) → Delegated to **Libuv thread pool**
3. Main thread continues handling other requests (non-blocking)
4. When I/O completes → Callback added to queue
5. Event Loop picks it up and executes

**Example:**
```javascript
// This doesn't block the server
app.get('/user/:id', async (req, res) => {
  // Database call is async, main thread continues
  const user = await User.findById(req.params.id);
  res.json(user);
});
```

**What blocks the Event Loop (BAD):**
```javascript
// ❌ Heavy computation blocks other requests
app.get('/compute', (req, res) => {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i; // Blocks!
  }
  res.json(result);
});
```

**Solution:** Use worker threads or separate service for CPU-intensive tasks."

---

### **Q15: How do you debug Node.js applications?**

**Model Answer:**
"I use multiple debugging techniques:

**1. Console.log (Quick debugging):**
```javascript
console.log('User data:', user);
console.error('Error occurred:', err);
```

**2. VS Code Debugger (Best for serious debugging):**
Create `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug App",
  "program": "${workspaceFolder}/server.js"
}
```
Set breakpoints, inspect variables, step through code.

**3. Node Inspector:**
```bash
node --inspect server.js
# Open chrome://inspect in Chrome
```

**4. Morgan (HTTP logging):**
```javascript
const morgan = require('morgan');
app.use(morgan('dev')); // Logs all HTTP requests
```

**5. Winston (Production logging):**
```javascript
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

**6. Error stack traces:**
```javascript
try {
  // code
} catch (err) {
  console.error(err.stack); // Full error trace
}
```"

---

### **Q16: What are environment variables? How do you use them?**

**Model Answer:**
"Environment variables store configuration that changes between environments (dev, staging, production).

**Why use them:**
- ✅ Don't commit secrets to Git
- ✅ Easy to change config without code changes
- ✅ Different values per environment

**Setup:**
```bash
npm install dotenv
```

**Create `.env` file:**
```
PORT=5000
DB_URL=mongodb://localhost:27017/mydb
JWT_SECRET=your-super-secret-key
NODE_ENV=development
```

**Use in code:**
```javascript
require('dotenv').config(); // Load .env file

const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
const JWT_SECRET = process.env.JWT_SECRET;

// Different behavior per environment
if (process.env.NODE_ENV === 'production') {
  // Enable caching, disable debug logs
} else {
  // Enable detailed logging
}
```

**IMPORTANT:** Add `.env` to `.gitignore`!

**In production (Heroku, AWS):**
Set environment variables in platform settings, not in .env file."

---

### **Q17: Explain Promise.all, Promise.race, Promise.allSettled, Promise.any**

**Model Answer:**
```javascript
const p1 = Promise.resolve('Success 1');
const p2 = Promise.resolve('Success 2');
const p3 = Promise.reject('Error 3');

// 1. Promise.all - All must succeed
Promise.all([p1, p2])
  .then(results => console.log(results)); // ['Success 1', 'Success 2']

Promise.all([p1, p2, p3])
  .catch(err => console.log(err)); // 'Error 3' (fails fast)

// Use: Fetch multiple required resources
const [users, posts, comments] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchComments()
]);

// 2. Promise.race - First to finish wins
Promise.race([p1, p2]).then(console.log); // 'Success 1' (first to resolve)

// Use: Timeout implementation
const dataWithTimeout = await Promise.race([
  fetchData(),
  new Promise((_, reject) => 
    setTimeout(() => reject('Timeout'), 5000)
  )
]);

// 3. Promise.allSettled - Wait for all (success or fail)
Promise.allSettled([p1, p2, p3]).then(results => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 'Success 1' },
  //   { status: 'fulfilled', value: 'Success 2' },
  //   { status: 'rejected', reason: 'Error 3' }
  // ]
});

// Use: Logging/reporting all results
const results = await Promise.allSettled([...apis]);
const successes = results.filter(r => r.status === 'fulfilled');
const failures = results.filter(r => r.status === 'rejected');

// 4. Promise.any - First success wins
Promise.any([p3, p1, p2]).then(console.log); // 'Success 1' (first success)

// Use: Try multiple sources, need one
const data = await Promise.any([
  fetchFromAPI1(),
  fetchFromAPI2(),
  fetchFromCache()
]);
```"

---

### **Q18: How do you handle file uploads in Node.js?**

**Model Answer:**
"I use **multer** middleware for file uploads in Express:

```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save to uploads folder
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

// File filter (validation)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type'), false);
  }
};

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: fileFilter
});

// Routes
// Single file
app.post('/upload', upload.single('avatar'), (req, res) => {
  res.json({
    message: 'File uploaded',
    file: req.file.filename
  });
});

// Multiple files
app.post('/upload-multiple', upload.array('photos', 5), (req, res) => {
  res.json({
    message: 'Files uploaded',
    files: req.files.map(f => f.filename)
  });
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});
```

**Best practices:**
- Validate file type and size
- Generate unique filenames
- Store large files in cloud (AWS S3, Cloudinary)
- Scan for malware in production"

---

### **Q19: What is clustering in Node.js?**

**Model Answer:**
"Clustering allows Node.js to utilize multi-core CPUs by creating child processes (workers):

```javascript
const cluster = require('cluster');
const os = require('os');
const express = require('express');

if (cluster.isMaster) {
  // Master process
  const numCPUs = os.cpus().length;
  console.log(`Master process ${process.pid} is running`);
  
  // Fork workers (one per CPU core)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  // Restart worker if it crashes
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // Replace dead worker
  });
  
} else {
  // Worker process
  const app = express();
  
  app.get('/', (req, res) => {
    res.send(`Handled by worker ${process.pid}`);
  });
  
  app.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
```

**Benefits:**
- Better performance (utilizes all CPU cores)
- High availability (if one worker crashes, others continue)
- Load balancing across workers

**When to use:**
- Production servers with high traffic
- CPU-intensive applications

**Alternative:** Use PM2 process manager:
```bash
pm2 start server.js -i max  # max = number of CPUs
```"

---

### **Q20: How do you connect Node.js with MongoDB?**

**Model Answer:**
"I use **Mongoose** (most popular ODM for MongoDB):

```javascript
const mongoose = require('mongoose');

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Connection error:', err));

// 2. Define Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 3. Create Model
const User = mongoose.model('User', userSchema);

// 4. CRUD Operations
// Create
const newUser = await User.create({
  name: 'Satyam',
  email: 'satyam@example.com',
  password: hashedPassword
});

// Read
const user = await User.findById(userId);
const users = await User.find({ name: 'Satyam' });

// Update
await User.findByIdAndUpdate(userId, { name: 'New Name' });

// Delete
await User.findByIdAndDelete(userId);

// Query with conditions
const activeUsers = await User.find({
  isActive: true,
  createdAt: { $gte: new Date('2024-01-01') }
}).limit(10).sort({ createdAt: -1 });
```

**This is exactly how I structure my MERN backend.**"

---

## 💻 SECTION 3: PRACTICAL CODING (Questions 21-30)

### **Q21: Write a function that reads multiple files and combines their content**

```javascript
const fs = require('fs').promises;

async function combineFiles(files, outputFile) {
  try {
    let combined = '';
    
    for (const file of files) {
      const content = await fs.readFile(file, 'utf8');
      combined += content + '\n---\n';
    }
    
    await fs.writeFile(outputFile, combined);
    console.log('Files combined successfully');
  } catch (err) {
    console.error('Error combining files:', err);
  }
}

// Usage
combineFiles(['file1.txt', 'file2.txt', 'file3.txt'], 'output.txt');
```

---

### **Q22: Implement rate limiting for an API**

```javascript
const rateLimit = {};

function rateLimiter(req, res, next) {
  const ip = req.ip;
  const currentTime = Date.now();
  const windowTime = 60 * 1000; // 1 minute
  const maxRequests = 10;
  
  if (!rateLimit[ip]) {
    rateLimit[ip] = { count: 1, startTime: currentTime };
    return next();
  }
  
  const timeElapsed = currentTime - rateLimit[ip].startTime;
  
  if (timeElapsed > windowTime) {
    // Reset window
    rateLimit[ip] = { count: 1, startTime: currentTime };
    return next();
  }
  
  if (rateLimit[ip].count >= maxRequests) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  rateLimit[ip].count++;
  next();
}

app.use(rateLimiter);
```

---

### **Q23: Create a simple logger middleware**

```javascript
const fs = require('fs');

function logger(req, res, next) {
  const log = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  };
  
  // Console log
  console.log(`[${log.timestamp}] ${log.method} ${log.url}`);
  
  // File log
  fs.appendFile('access.log', JSON.stringify(log) + '\n', (err) => {
    if (err) console.error('Logging error:', err);
  });
  
  next();
}

app.use(logger);
```

---

### **Q24: Implement a timeout wrapper for promises**

```javascript
function promiseWithTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Operation timeout')), ms)
  );
  
  return Promise.race([promise, timeout]);
}

// Usage
async function fetchWithTimeout() {
  try {
    const data = await promiseWithTimeout(
      fetch('https://api.example.com/data'),
      5000 // 5 second timeout
    );
    console.log(data);
  } catch (err) {
    console.error(err.message); // 'Operation timeout'
  }
}
```

---

### **Q25: Create a simple caching mechanism**

```javascript
const cache = new Map();

function getCachedData(key, fetchFunction, ttl = 60000) {
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    console.log('Returning from cache');
    return Promise.resolve(cached.data);
  }
  
  return fetchFunction().then(data => {
    cache.set(key, { data, timestamp: Date.now() });
    return data;
  });
}

// Usage
app.get('/users', async (req, res) => {
  const users = await getCachedData(
    'all_users',
    () => User.find(),
    30000 // 30 second cache
  );
  res.json(users);
});
```

---

### **Q26: Implement retry logic for failed API calls**

```javascript
async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      throw new Error(`HTTP ${response.status}`);
    } catch (err) {
      console.log(`Attempt ${i + 1} failed: ${err.message}`);
      
      if (i === retries - 1) throw err; // Last attempt
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, 1000 * Math.pow(2, i))
      );
    }
  }
}

// Usage
try {
  const data = await fetchWithRetry('https://api.example.com/data');
  console.log(data);
} catch (err) {
  console.error('All retries failed:', err);
}
```

---

### **Q27: Create a simple queue processor**

```javascript
class Queue {
  constructor() {
    this.items = [];
    this.processing = false;
  }
  
  add(task) {
    this.items.push(task);
    this.process();
  }
  
  async process() {
    if (this.processing || this.items.length === 0) return;
    
    this.processing = true;
    
    while (this.items.length > 0) {
      const task = this.items.shift();
      try {
        await task();
      } catch (err) {
        console.error('Task failed:', err);
      }
    }
    
    this.processing = false;
  }
}

// Usage
const queue = new Queue();

queue.add(async () => {
  await sendEmail('[email protected]');
});

queue.add(async () => {
  await processImage('photo.jpg');
});
```

---

### **Q28: Validate request body middleware**

```javascript
function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(d => d.message)
      });
    }
    
    next();
  };
}

// Usage with Joi
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(100)
});

app.post('/users', validateRequest(userSchema), (req, res) => {
  // If we reach here, data is valid
  res.json({ message: 'User created' });
});
```

---

### **Q29: Implement pagination helper**

```javascript
async function paginate(model, page = 1, limit = 10, filter = {}) {
  const skip = (page - 1) * limit;
  
  const [data, total] = await Promise.all([
    model.find(filter).skip(skip).limit(limit),
    model.countDocuments(filter)
  ]);
  
  return {
    data,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit
    }
  };
}

// Usage
app.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  
  const result = await paginate(User, page, limit);
  res.json(result);
});
```

---

### **Q30: Create a simple API response formatter**

```javascript
class ApiResponse {
  static success(data, message = 'Success') {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }
  
  static error(message, statusCode = 500, errors = null) {
    return {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString()
    };
  }
  
  static paginated(data, pagination) {
    return {
      success: true,
      data,
      pagination,
      timestamp: new Date().toISOString()
    };
  }
}

// Usage
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(ApiResponse.success(users, 'Users fetched successfully'));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch users'));
  }
});
```

---

**Good luck! You've got this! **
