# npm (Node Package Manager)

npm is the default package manager for Node.js. It helps developers manage project dependencies, scripts, and package publishing.

---

## What is npm?

- **npm** stands for Node Package Manager.
- It is both an online repository for open-source Node.js packages and a command-line tool to interact with that repository.
- Every Node.js project can have a `package.json` file, which lists dependencies and project metadata.

---

## Key Concepts

### 1. **package.json**
- The heart of any Node.js project.
- Contains metadata (name, version, description), dependencies, scripts, and more.
- Created with `npm init`.

**Example:**
```json
{
  "name": "my-app",
  "version": "1.0.0",
  "description": "A sample Node.js app",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.18.0"
  }
}
```

---

### 2. **Installing Packages**

- **Local Install:** Installs to `node_modules` in your project.
  ```
  npm install express
  ```
- **Global Install:** Installs for use in any project (often for CLI tools).
  ```
  npm install -g nodemon
  ```

---

### 3. **Dependency Types**

- **dependencies:** Required for your app to run (default).
- **devDependencies:** Needed only for development (e.g., testing tools).
  ```
  npm install --save-dev jest
  ```

---

### 4. **Updating and Removing Packages**

- **Update:**  
  ```
  npm update <package>
  ```
- **Uninstall:**  
  ```
  npm uninstall <package>
  ```

---

### 5. **Scripts**

- Define custom commands in `package.json` under `"scripts"`.
- Run with `npm run <script-name>`.
- Example:
  ```json
  "scripts": {
    "start": "node app.js",
    "test": "jest"
  }
  ```

---

### 6. **Semantic Versioning**

- npm uses semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)
- Prefixes:
  - `^` (caret): Compatible with the latest minor/patch version.
  - `~` (tilde): Compatible with the latest patch version.

---

### 7. **Publishing Packages**

- You can publish your own packages to the npm registry using:
  ```
  npm publish
  ```
- Requires an npm account.

---

### 8. **Useful Commands**

- `npm list` – List installed packages.
- `npm outdated` – Check for outdated packages.
- `npm audit` – Check for security vulnerabilities.

---

## Summary

npm is essential for managing Node.js project dependencies, scripts, and sharing code. Mastering npm helps you build, maintain, and scale Node.js
