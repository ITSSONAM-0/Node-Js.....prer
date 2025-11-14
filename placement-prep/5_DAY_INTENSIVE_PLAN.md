
**Exercise 1: Basic Express Server**
```javascript
// Create: day1-express-server.js
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.get('/about', (req, res) => {
  res.json({ message: 'About Page' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```
**Run it:** `node day1-express-server.js`
**Test:** Open browser → `http://localhost:3000`

---

**Exercise 2: Async/Await Practice (15 min)**
```javascript
// Create: day1-async-practice.js
const fs = require('fs').promises;

// Practice 1: Read file
async function readFile() {
  try {
    const data = await fs.readFile('test.txt', 'utf8');
    console.log('File content:', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Practice 2: Multiple async operations
async function fetchMultiple() {
  try {
    const [file1, file2] = await Promise.all([
      fs.readFile('file1.txt', 'utf8'),
      fs.readFile('file2.txt', 'utf8')
    ]);
    console.log('File 1:', file1);
    console.log('File 2:', file2);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

readFile();
```
**Run it:** Create test.txt first, then `node day1-async-practice.js`

---

**Exercise 3: Module Creation (15 min)**
```javascript
// Create: math.js
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };

// Create: day1-module-test.js
const math = require('./math');

console.log('2 + 3 =', math.add(2, 3));
console.log('2 * 3 =', math.multiply(2, 3));
```
**Run it:** `node day1-module-test.js`

---

#### **Block 2: Build REST API**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// Middleware: Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { name, email } = req.body;
  if (name) user.name = name;
  if (email) user.email = email;
  
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
```

---

#### **Block 3: Explain While Coding **
🎤 **Practice Live Coding Narration:**

**Open a blank file and CODE WHILE SPEAKING:**

"I'll create a POST endpoint for user registration..."
```javascript
app.post('/register', async (req, res) => {
  // "First, I'll validate the input"
  const { email, password } = req.body;
  
  if (!email || !password) {
    // "Return 400 if validation fails"
    return res.status(400).json({ error: 'Fields required' });
  }
  
  // "Wrap in try-catch for error handling"
  try {
    // "Check if user exists"
    const exists = users.find(u => u.email === email);
    if (exists) {
      return res.status(409).json({ error: 'Email exists' });
    }
    
    // "Create new user"
    const user = { id: users.length + 1, email };
    users.push(user);
    
    // "Return success"
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});
```

---


### **Block 1: Theory**
📖 **Study:**
1. `ADVANCED_TOPICS_COMPLETE.md` - **Streams section** (20 min)
2. `ADVANCED_TOPICS_COMPLETE.md` - **Buffers section** (15 min)
3. Review Promise.all, race, allSettled examples (10 min)

---

#### **Block 2: Hands-on Practice (45 min)**

**Exercise 1: File Operations (15 min)**
```javascript
// Create: day3-file-ops.js
const fs = require('fs').promises;

async function fileOperations() {
  try {
    // Write file
    await fs.writeFile('output.txt', 'Hello Node.js!');
    console.log('File written');
    
    // Read file
    const data = await fs.readFile('output.txt', 'utf8');
    console.log('File content:', data);
    
    // Append to file
    await fs.appendFile('output.txt', '\nNew line added');
    
    // Read again
    const updated = await fs.readFile('output.txt', 'utf8');
    console.log('Updated content:', updated);
    
    // Delete file
    await fs.unlink('output.txt');
    console.log('File deleted');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

fileOperations();
```

---

**Exercise 2: Streams (15 min)**
```javascript
// Create: day3-streams.js
const fs = require('fs');

// Create a large file first
const writeStream = fs.createWriteStream('large-file.txt');
for (let i = 0; i < 100000; i++) {
  writeStream.write(`Line ${i}: This is some data\n`);
}
writeStream.end();

console.log('Large file created');

// Read with streams
const readStream = fs.createReadStream('large-file.txt', 'utf8');

let lineCount = 0;
readStream.on('data', chunk => {
  lineCount += chunk.split('\n').length - 1;
});

readStream.on('end', () => {
  console.log('Total lines:', lineCount);
});

readStream.on('error', err => {
  console.error('Error:', err);
});
```

---

**Exercise 3: Promise Methods (15 min)**
```javascript
// Create: day3-promises.js

// Simulate API calls
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: `User ${id}` });
      } else {
        reject(new Error('Invalid ID'));
      }
    }, 1000);
  });
}

// Promise.all - all must succeed
async function testPromiseAll() {
  console.log('Testing Promise.all...');
  try {
    const [user1, user2, user3] = await Promise.all([
      fetchUser(1),
      fetchUser(2),
      fetchUser(3)
    ]);
    console.log('All users:', user1, user2, user3);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Promise.allSettled - wait for all regardless of success/failure
async function testAllSettled() {
  console.log('\nTesting Promise.allSettled...');
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(-1), // This will reject
    fetchUser(3)
  ]);
  
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(`Promise ${index}: Success -`, result.value);
    } else {
      console.log(`Promise ${index}: Failed -`, result.reason.message);
    }
  });
}

// Promise.race - first to finish wins
async function testPromiseRace() {
  console.log('\nTesting Promise.race...');
  const result = await Promise.race([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  console.log('First result:', result);
}

// Run all tests
async function runAll() {
  await testPromiseAll();
  await testAllSettled();
  await testPromiseRace();
}

runAll();
```

---

#### **Block 3: Explain Out Loud (30 min)**
🎤 **Record explanations:**

1. "What are streams and when would you use them?" (60 sec)
2. "Explain Promise.all vs Promise.allSettled" (60 sec)
3. "How do you read a large file efficiently?" (60 sec)
4. "What are buffers in Node.js?" (60 sec)
5. Walk through the streams code explaining each part (5 min)

---

#### **Block 4: Self-Test (30 min)**
📝 **Questions:**

1. What are the 4 types of streams?
2. When would you use streams vs regular file operations?
3. Write code to copy a file using streams
4. Explain Promise.race with a real-world example
5. What is backpressure in streams?

---

### ✅ **Day 3 Completion Checklist:**
- [ ] Practiced file operations
- [ ] Created and read streams
- [ ] Tested all Promise methods
- [ ] Recorded explanations
- [ ] Completed self-test

**Time Spent:** ⏰ 2.5 hours

---

## 📅 DAY 4: ADVANCED TOPICS + PROJECT PREP (2.5 hrs)

### **Block 1: Theory (45 min)**
📖 **Study:**
1. `ADVANCED_TOPICS_COMPLETE.md` - **Clustering** (15 min)
2. `ADVANCED_TOPICS_COMPLETE.md` - **EventEmitter** (15 min)
3. `ADVANCED_TOPICS_COMPLETE.md` - **Performance Optimization** (15 min)

---

#### **Block 2: Coding Practice (45 min)**

**Exercise 1: EventEmitter (15 min)**
```javascript
// Create: day4-events.js
const EventEmitter = require('events');

class UserService extends EventEmitter {
  async registerUser(userData) {
    try {
      // Simulate user creation
      const user = { id: Date.now(), ...userData };
      console.log('User created:', user);
      
      // Emit events
      this.emit('user:registered', user);
      
      return user;
    } catch (error) {
      this.emit('user:error', error);
      throw error;
    }
  }
}

const userService = new UserService();

// Listen to events
userService.on('user:registered', user => {
  console.log('[Email Service] Sending welcome email to:', user.email);
});

userService.on('user:registered', user => {
  console.log('[Analytics] Tracking registration for:', user.email);
});

userService.on('user:error', error => {
  console.error('[Logger] Error occurred:', error.message);
});

// Register a user
userService.registerUser({ 
  name: 'John Doe', 
  email: 'john@example.com' 
});
```

---

**Exercise 2: Authentication Middleware (30 min)**
```javascript
// Create: day4-auth-api.js
const express = require('express');
const app = express();

app.use(express.json());

// Fake users database
const users = [
  { id: 1, email: 'admin@test.com', password: 'password123', role: 'admin' },
  { id: 2, email: 'user@test.com', password: 'password123', role: 'user' }
];

// Fake token storage (in production, use JWT)
const sessions = new Map();

// Authentication Middleware
function isAuthenticated(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  const user = sessions.get(token);
  if (!user) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  
  req.user = user;
  next();
}

// Role check middleware
function requireRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
}

// Public route: Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  // Generate token (simplified)
  const token = 'token_' + Date.now();
  sessions.set(token, user);
  
  res.json({ 
    token, 
    user: { id: user.id, email: user.email, role: user.role } 
  });
});

// Protected route: Profile
app.get('/profile', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

// Admin only route
app.get('/admin', isAuthenticated, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin!', users });
});

// Logout
app.post('/logout', isAuthenticated, (req, res) => {
  const token = req.headers.authorization;
  sessions.delete(token);
  res.json({ message: 'Logged out' });
});

app.listen(3000, () => {
  console.log('Auth API running on port 3000');
});

// Test Instructions in console:
console.log('\nTest with:');
console.log('1. POST /login - body: {"email":"admin@test.com","password":"password123"}');
console.log('2. GET /profile - header: Authorization: <token>');
console.log('3. GET /admin - header: Authorization: <token>');
```




---

#### **Block 2: Live Coding Practice (45 min)**

**Challenge 1: Build Login API (20 min)**
**Without looking at notes, code:**
- POST /register endpoint with validation
- POST /login endpoint with error handling
- GET /profile endpoint with auth middleware
- Proper HTTP status codes
- Error handling

**Challenge 2: File Upload Feature (25 min)**
```javascript
// Create: day5-file-upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDFs allowed!'));
  }
};

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter
});

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  res.json({
    message: 'File uploaded successfully',
    file: {
      filename: req.file.filename,
      size: req.file.size,
      path: req.file.path
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log('Upload API running'));
```

---
