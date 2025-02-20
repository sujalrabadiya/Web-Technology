When creating and testing a CRUD API using Node.js, Express, and MongoDB, you may encounter several errors. Below is a categorized list of possible errors:

---

### **1. Setup and Installation Errors**
- **Module Not Found**  
  - Error: `Error: Cannot find module 'express'`\
    or `Error: Cannot find module '../user-router.js'`
  - Cause: Dependencies are not installed.\
    or Incorrect path in require statement.
  - Solution: Run `npm install` to install required dependencies.\
    or Correct path in require statement.

- **MongoDB Connection Failure**  
  - Error: `MongoNetworkError: failed to connect to server`  
  - Cause: Incorrect MongoDB URI or server is not running.  
  - Solution: Ensure MongoDB is running and check the URI given in `mogoose.connect()`.\
    or Edit MongoDB Connection String to `127.0.0.1` if MongoDB is still not connecting.

---

### **2. Database Connection Errors**
- **Invalid MongoDB Connection String**  
  - Error: `MongoParseError: Invalid connection string`  
  - Cause: The MongoDB connection string is incorrect or missing required parameters.  
  - Solution: Verify and correct the connection string format.\
    or Edit MongoDB Connection String to `127.0.0.1` if MongoDB is still not connecting.

---


### **3. Server & Deployment Errors**
- **Port Already in Use**  
  - Error: `EADDRINUSE: address already in use`  
  - Cause: The port (e.g., 3000) is already being used by another process or server.  
  - Solution: Use a different port (`5000`)\
    or Close all terminals and rerun server\
    or stop exsiting running server using `CTRL+C` and try to rerun server.

---

### **4. CRUD Operation Errors**
- **Create Operation Errors**
  - Error: `TypeError: Cannot read property 'save' of undefined`  
  - Cause: The model is not properly defined (`-model.js`) or imported (`-controller.js`).  
  - Solution: Ensure the model is correctly imported and instantiated before calling `.save()`.

- **Read Operation Errors**
  - Error: `TypeError: Cannot read properties of undefined (reading 'find')`  
  - Cause: The Mongoose model is not properly initialized.  
  - Solution: Verify the schema and model definition in `-model.js` and `-controller.js`.

- **Update Operation Errors**
  - Error: `CastError: Cast to ObjectId failed for value "xyz"`  
  - Cause: Invalid ID format used for updating a document (Invalid DataType).  
  - Solution: Validate the ID format before updating (check DataType of field given in error message).

---

### **5. Testing & Postman Errors**
- **Request Timeouts**  
  - Error: `ETIMEDOUT`\
    `connect ECONNREFUSED 127.0.0.1:3000`
  - Cause: Server is not responding within the expected time.  \
    Server is not running.
  - Solution: Check if the server is running and listening on the correct port.

- **Invalid Route or Endpoint Not Found**  
  - Error: `Cannot GET /api/users`  
  - Cause: Route is not defined or misspelled in `app.js` or `-router.js`.  
  - Solution: Verify that the route exists and matches the request.

- **Method Not Allowed**  
  - Error: `Cannot DELETE /api/users`  
  - Cause: The HTTP method is not supported for the requested endpoint.  
  - Solution: Ensure that the route handler is implemented for the given method in `-router.js`.

- **Request Body Validation Fails**  
  - Error: `Error: Missing required fields`  
  - Cause: Required fields are missing in the request body.  
  - Solution: Add Required fields in Request body.

- **Invalid JSON Format in Request**  
  - Error: `SyntaxError: Unexpected token in JSON`  
  - Cause: Malformed JSON in request body.  
  - Solution: Ensure the request body is correctly formatted.\
    (e.g. less or more comma `,`, inappropriate brackets `{}`, inappropriate indentation `space`, missing or inappropriate quotes `""`)

- **Duplicate Key Error**  
  - Error: `MongoError: E11000 duplicate key error collection`  
  - Cause: Trying to insert a document with a duplicate `_id` or unique field.  
  - Solution: Insert a document with a different `_id` or unique field.

---
### **⚠The first step in Error solving is to `Read`👀 and `Understand` the error-message!**
