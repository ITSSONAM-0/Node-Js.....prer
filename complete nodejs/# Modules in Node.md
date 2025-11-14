# Modules in Node.js

Modules are fundamental building blocks in Node.js. They help you organize your code into smaller, reusable, and maintainable pieces.

---

## Why Use Modules?

- **Separation of Concerns:** Each module can focus on a specific functionality.
- **Reusability:** Write once, use anywhere in your project.
- **Maintainability:** Easier to debug and update code.

---

## Types of Modules

1. **Built-in Modules:** Provided by Node.js (e.g., `fs`, `http`, `path`).
2. **User-defined Modules:** Your own files (e.g., `math.js`).
3. **Third-party Modules:** Installed via npm (e.g., `express`, `lodash`).

---

## Module Systems

### 1. CommonJS (Default in Node.js)

- Uses `require()` to import and `module.exports` to export.
- Synchronous loading.
- Used in `.js` files.

**Example:**
```javascript
// math.js
function add(a, b) {
  return a + b;
}
module.exports = { add };

// app.js
const math = require('./math');
console.log(math.add(2, 3)); // Output: 5
```

---

### 2. ES Modules (ECMAScript Modules)

- Uses `import` and `export`.
- Asynchronous loading.
- Used in `.mjs` files or when `"type": "module"` is set in `package.json`.

**Example:**
```javascript
// math.mjs
export function add(a, b) {
  return a + b;
}

// app.mjs
import { add } from './math.mjs';
console.log(add(2, 3)); // Output: 5
```

---

## Exporting in CommonJS

- **Single Export:**
  ```javascript
  module.exports = function() { ... }
  ```
- **Multiple Exports:**
  ```javascript
  module.exports = { func1, func2 }
  ```

## Importing in CommonJS

- Import the entire module:
  ```javascript
  const myModule = require('./myModule');
  ```

---

## Built-in Modules Example

```javascript
const fs = require('fs');
fs.writeFileSync('test.txt', 'Hello, Node.js!');
```

---

## Third-party Modules Example

Install with npm:
```
npm install lodash
```
Use in code:
```javascript
const _ = require('lodash');
console.log(_.capitalize('node.js modules'));
```

---

## Module Caching

- When a module is loaded, it is cached.
- Subsequent `require()` calls return the cached version, improving performance.

---

## Best Practices

- Keep modules focused and small.
- Use clear and descriptive names.
- Avoid circular dependencies.

---

**Summary:**  
Modules are essential for structuring Node.js applications. Understanding both CommonJS and ES Modules will help you write modern, maintainable, and scalable code.
