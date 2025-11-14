// FILE SYSTEM OPERATIONS CHALLENGES
// Master fs module for interview questions

const fs = require('fs').promises;
const path = require('path');

console.log('=== FILE SYSTEM CHALLENGES ===\n');

/* 
 * CHALLENGE 1: Read Directory Recursively
 * List all files in a directory and subdirectories
 * Difficulty: Medium
 */
async function listFilesRecursively(dir, indent = '') {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        console.log(`${indent} ${entry.name}/`);
        await listFilesRecursively(fullPath, indent + '  ');
      } else {
        console.log(`${indent} ${entry.name}`);
      }
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
}

async function challenge1() {
  console.log('--- Challenge 1: List Files Recursively ---');
  
  // Create test directory structure
  await fs.mkdir('test-dir', { recursive: true });
  await fs.mkdir('test-dir/subdir1', { recursive: true });
  await fs.mkdir('test-dir/subdir2', { recursive: true });
  await fs.writeFile('test-dir/file1.txt', 'Content 1');
  await fs.writeFile('test-dir/subdir1/file2.txt', 'Content 2');
  await fs.writeFile('test-dir/subdir2/file3.txt', 'Content 3');
  
  await listFilesRecursively('test-dir');
  
  // Cleanup
  await fs.rm('test-dir', { recursive: true, force: true });
}

/* 
 * CHALLENGE 2: Copy Directory
 * Copy entire directory with all contents
 * Difficulty: Medium
 */
async function copyDirectory(src, dest) {
  try {
    await fs.mkdir(dest, { recursive: true });
    const entries = await fs.readdir(src, { withFileTypes: true });
    
    for (const entry of entries) {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      
      if (entry.isDirectory()) {
        await copyDirectory(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
    
    console.log(`Copied ${src} to ${dest}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

async function challenge2() {
  console.log('\n--- Challenge 2: Copy Directory ---');
  
  // Create source directory
  await fs.mkdir('source', { recursive: true });
  await fs.writeFile('source/file1.txt', 'File 1');
  await fs.writeFile('source/file2.txt', 'File 2');
  
  await copyDirectory('source', 'destination');
  
  // Verify
  const files = await fs.readdir('destination');
  console.log('Copied files:', files);
  
  // Cleanup
  await fs.rm('source', { recursive: true, force: true });
  await fs.rm('destination', { recursive: true, force: true });
}

/* 
 * CHALLENGE 3: Find Files by Extension
 * Search for all files with specific extension
 * Difficulty: Easy
 */
async function findFilesByExtension(dir, extension) {
  const results = [];
  
  async function search(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await search(fullPath);
      } else if (entry.name.endsWith(extension)) {
        results.push(fullPath);
      }
    }
  }
  
  await search(dir);
  return results;
}

async function challenge3() {
  console.log('\n--- Challenge 3: Find Files by Extension ---');
  
  // Create test files
  await fs.mkdir('search-test', { recursive: true });
  await fs.writeFile('search-test/file1.txt', 'Text file');
  await fs.writeFile('search-test/file2.js', 'JS file');
  await fs.writeFile('search-test/file3.txt', 'Another text');
  
  const txtFiles = await findFilesByExtension('search-test', '.txt');
  console.log('Found .txt files:', txtFiles);
  
  // Cleanup
  await fs.rm('search-test', { recursive: true, force: true });
}

/* 
 * CHALLENGE 4: File Size Calculator
 * Calculate total size of directory
 * Difficulty: Medium
 */
async function calculateDirectorySize(dir) {
  let totalSize = 0;
  
  async function traverse(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else {
        const stats = await fs.stat(fullPath);
        totalSize += stats.size;
      }
    }
  }
  
  await traverse(dir);
  return totalSize;
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function challenge4() {
  console.log('\n--- Challenge 4: Calculate Directory Size ---');
  
  // Create test directory with files
  await fs.mkdir('size-test', { recursive: true });
  await fs.writeFile('size-test/small.txt', 'x'.repeat(100));
  await fs.writeFile('size-test/medium.txt', 'x'.repeat(10000));
  await fs.writeFile('size-test/large.txt', 'x'.repeat(100000));
  
  const size = await calculateDirectorySize('size-test');
  console.log('Total size:', formatBytes(size));
  
  // Cleanup
  await fs.rm('size-test', { recursive: true, force: true });
}

/* 
 * CHALLENGE 5: Watch File Changes
 * Monitor file for changes and log them
 * Difficulty: Medium
 */
async function challenge5() {
  console.log('\n--- Challenge 5: Watch File Changes ---');
  
  const filename = 'watch-test.txt';
  await fs.writeFile(filename, 'Initial content');
  
  console.log('Watching file for changes (will stop after 5 seconds)...');
  
  const watcher = fs.watch(filename);
  
  // Simulate file changes
  setTimeout(() => fs.appendFile(filename, '\nLine 2'), 1000);
  setTimeout(() => fs.appendFile(filename, '\nLine 3'), 2000);
  setTimeout(() => fs.appendFile(filename, '\nLine 4'), 3000);
  
  for await (const event of watcher) {
    console.log(`File ${event.eventType}: ${event.filename}`);
  }
  
  // Cleanup
  await fs.unlink(filename);
}

/* 
 * CHALLENGE 6: Merge Multiple Files
 * Combine content of all .txt files into one
 * Difficulty: Easy
 */
async function mergeTextFiles(dir, outputFile) {
  const entries = await fs.readdir(dir);
  let merged = '';
  
  for (const entry of entries) {
    if (entry.endsWith('.txt')) {
      const content = await fs.readFile(path.join(dir, entry), 'utf8');
      merged += `\n--- ${entry} ---\n${content}\n`;
    }
  }
  
  await fs.writeFile(outputFile, merged);
  console.log(`Merged files into ${outputFile}`);
}

async function challenge6() {
  console.log('\n--- Challenge 6: Merge Multiple Files ---');
  
  // Create test files
  await fs.mkdir('merge-test', { recursive: true });
  await fs.writeFile('merge-test/file1.txt', 'Content of file 1');
  await fs.writeFile('merge-test/file2.txt', 'Content of file 2');
  await fs.writeFile('merge-test/file3.txt', 'Content of file 3');
  
  await mergeTextFiles('merge-test', 'merge-test/merged.txt');
  
  const merged = await fs.readFile('merge-test/merged.txt', 'utf8');
  console.log('Merged content:', merged);
  
  // Cleanup
  await fs.rm('merge-test', { recursive: true, force: true });
}

/* 
 * CHALLENGE 7: Safe File Write (Atomic)
 * Write to temp file first, then rename (prevents corruption)
 * Difficulty: Medium
 */
async function safeWrite(filename, content) {
  const tempFile = `${filename}.tmp`;
  
  try {
    await fs.writeFile(tempFile, content);
    await fs.rename(tempFile, filename);
    console.log(`Safely wrote to ${filename}`);
  } catch (err) {
    // Clean up temp file if failed
    try {
      await fs.unlink(tempFile);
    } catch {}
    throw err;
  }
}

async function challenge7() {
  console.log('\n--- Challenge 7: Safe File Write ---');
  
  await safeWrite('safe-test.txt', 'Important data');
  const content = await fs.readFile('safe-test.txt', 'utf8');
  console.log('Content:', content);
  
  // Cleanup
  await fs.unlink('safe-test.txt');
}

/* 
 * CHALLENGE 8: Check File Permissions
 * Verify if file is readable/writable
 * Difficulty: Easy
 */
async function checkPermissions(filename) {
  try {
    await fs.access(filename, fs.constants.R_OK);
    console.log(`${filename} is readable`);
  } catch {
    console.log(`${filename} is NOT readable`);
  }
  
  try {
    await fs.access(filename, fs.constants.W_OK);
    console.log(`${filename} is writable`);
  } catch {
    console.log(`${filename} is NOT writable`);
  }
}

async function challenge8() {
  console.log('\n--- Challenge 8: Check File Permissions ---');
  
  await fs.writeFile('perm-test.txt', 'Test content');
  await checkPermissions('perm-test.txt');
  
  // Cleanup
  await fs.unlink('perm-test.txt');
}

// RUN ALL CHALLENGES
async function runAll() {
  try {
    await challenge1();
    await challenge2();
    await challenge3();
    await challenge4();
    // await challenge5(); // Skip watch (takes 5 seconds)
    await challenge6();
    await challenge7();
    await challenge8();
    
    console.log('\n✅ All file system challenges completed!');
  } catch (err) {
    console.error('Error:', err);
  }
}

// Uncomment to run
runAll();