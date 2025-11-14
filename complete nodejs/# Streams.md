# Streams in Node.js

Streams are powerful abstractions for working with data that is read from or written to a source in small chunks, rather than all at once. This makes them ideal for handling large files, network communications, or any scenario where you want to process data efficiently and with low memory usage.

---

## Why Use Streams?

- **Efficiency:** Process data as it arrives, without loading everything into memory.
- **Performance:** Useful for large files, video/audio streaming, or real-time data.
- **Composability:** Streams can be piped together to build complex data flows.

---

## Types of Streams

1. **Readable Streams:** For reading data (e.g., `fs.createReadStream`, HTTP requests).
2. **Writable Streams:** For writing data (e.g., `fs.createWriteStream`, HTTP responses).
3. **Duplex Streams:** Both readable and writable (e.g., TCP sockets).
4. **Transform Streams:** Duplex streams that can modify or transform the data as it passes through (e.g., zlib compression).

---

## Core Methods and Events

- **Events:**  
  - `data`: Emitted when a chunk of data is available.
  - `end`: Emitted when no more data will be provided.
  - `error`: Emitted on error.
  - `finish`: Emitted when all data has been flushed to the underlying system (writable).
- **Methods:**  
  - `pipe()`: Connects the output of one stream to the input of another.

---

## Example: Reading and Writing with Streams

```js
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);
```
This reads data from `input.txt` and writes it to `output.txt` efficiently.

---

## Example: Transform Stream (Uppercase)

```js
const { Transform } = require('stream');
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase());
  }
});

process.stdin.pipe(upperCase).pipe(process.stdout);
```
This will convert any input from the terminal to uppercase and print it out.

---

## Interview Problems

### 1. How would you count the number of lines in a large file using streams?
**Hint:** Read the file as a stream, count `\n` characters in each chunk.

```js
const fs = require('fs');
let lines = 0;
const readStream = fs.createReadStream('bigfile.txt');
readStream.on('data', chunk => {
  lines += chunk.toString().split('\n').length - 1;
});
readStream.on('end', () => {
  console.log('Total lines:', lines);
});
```

---

### 2. How do you handle errors in streams?
**Answer:** Always listen for the `error` event on both readable and writable streams.

```js
readStream.on('error', err => console.error('Read error:', err));
writeStream.on('error', err => console.error('Write error:', err));
```

---

### 3. How would you compress a file using streams?
**Answer:** Use the `zlib` module with streams.

```js
const fs = require('fs');
const zlib = require('zlib');
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
```

---

### 4. What is backpressure in streams?
**Answer:** Backpressure occurs when the writable stream cannot process data as fast as the readable stream provides it. Node.js handles this internally, but you can listen for the `drain` event and use `stream.write()`'s return value to manage flow manually.

---

## Best Practices

- Always handle `error` events.
- Use `pipe()` for connecting streams.
- Be aware of backpressure in high-throughput scenarios.
- Use transform streams for data processing pipelines.

---

Streams are a fundamental concept in Node.js for building scalable and efficient applications, and are a common topic in interviews!
