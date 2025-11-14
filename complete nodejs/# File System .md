# File System (fs module) in Node.js

The `fs` module in Node.js provides an API for interacting with the file system. It supports both synchronous and asynchronous methods for reading, writing, updating, and deleting files and directories.

---

## 1. Reading Files

- **Asynchronous:** Non-blocking, preferred for most use-cases.
  ```js
  const fs = require('fs');
  fs.readFile('test.txt', 'utf8', (err, data) => {
    if (err) return console.error(err);
    console.log(data);
  });
  ```
- **Synchronous:** Blocking, use only for scripts or startup logic.
  ```js
  const data = fs.readFileSync('test.txt', 'utf8');
  console.log(data);
  ```

---

## 2. Writing Files

- **Asynchronous:**
  ```js
  fs.writeFile('test.txt', 'Hello Node!', err => {
    if (err) return console.error(err);
    console.log('File written!');
  });
  ```
- **Synchronous:**
  ```js
  fs.writeFileSync('test.txt', 'Hello Node!');
  ```

---

## 3. Appending to Files

- **Asynchronous:**
  ```js
  fs.appendFile('test.txt', '\nAppended text.', err => {
    if (err) return console.error(err);
    console.log('Text appended!');
  });
  ```
- **Synchronous:**
  ```js
  fs.appendFileSync('test.txt', '\nAppended text.');
  ```

---

## 4. Deleting Files

- **Asynchronous:**
  ```js
  fs.unlink('test.txt', err => {
    if (err) return console.error(err);
    console.log('File deleted!');
  });
  ```
- **Synchronous:**
  ```js
  fs.unlinkSync('test.txt');
  ```

---

## 5. Working with Directories

- **Create Directory:**
  ```js
  fs.mkdir('myDir', err => {
    if (err) return console.error(err);
    console.log('Directory created!');
  });
  ```
- **Read Directory:**
  ```js
  fs.readdir('.', (err, files) => {
    if (err) return console.error(err);
    console.log(files);
  });
  ```
- **Delete Directory:**
  ```js
  fs.rmdir('myDir', err => {
    if (err) return console.error(err);
    console.log('Directory removed!');
  });
  ```

---

## 6. Checking File/Directory Existence

- **Using `fs.existsSync`:**
  ```js
  if (fs.existsSync('test.txt')) {
    console.log('File exists!');
  }
  ```

---

## 7. Promises API

Node.js provides a promise-based version of the `fs` module:
```js
const fsPromises = require('fs').promises;
async function readFile() {
  try {
    const data = await fsPromises.readFile('test.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
readFile();
```

---

## Interview Problems

### 1. Read all files in a directory and print their contents.
```js
const fs = require('fs').promises;
async function printAllFiles(dir) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const data = await fs.readFile(`${dir}/${file}`, 'utf8');
    console.log(`--- ${file} ---\n${data}`);
  }
}
printAllFiles('.');
```

### 2. Write a function to copy a file.
```js
const fs = require('fs').promises;
async function copyFile(src, dest) {
  await fs.copyFile(src, dest);
  console.log('File copied!');
}
copyFile('test.txt', 'copy.txt');
```

### 3. How do you handle errors when deleting a file that may not exist?
- Use a try/catch block with the promise API, or check existence before deleting.

```js
const fs = require('fs').promises;
async function safeDelete(file) {
  try {
    await fs.unlink(file);
    console.log('Deleted!');
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log('File does not exist.');
    } else {
      throw err;
    }
  }
}
safeDelete('maybe.txt');
```

---

## Best Practices

- Prefer asynchronous methods for scalability.
- Always handle errors (especially with file operations).
- Use the promise-based API (`fs.promises`) with async/await for cleaner code.
- Avoid blocking the event loop with synchronous methods in production servers.

---

The `fs` module is essential for backend tasks like file uploads, logging, and configuration management
