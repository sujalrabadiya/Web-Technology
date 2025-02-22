# Step-by-Step Implementation Guide for CRUD Operations on REST API

## 1. Project Setup

### Install Required Packages
```sh
npm init -y  # Initialize Node.js project
npm install express mongoose cors  # Install dependencies
```

## 2. Database Schema Definition

### Create `models/user-model.js`
```js
// Importing mongoose for database interaction
const mongoose = require('mongoose');

// Defining the User schema with required fields
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name field (required)
    age: { type: Number, required: true }, // Age field (required)
    imgUrl: { type: String }, // Optional image URL
    createdAt: { type: Date, default: Date.now }, // Timestamp with default value as current date
});

// Exporting the User model for use in controllers
module.exports = mongoose.model('User', userSchema);
```

## 3. Controller Functions for CRUD Operations

### Create `controllers/user-controller.js`
```js
// Importing the User model
const User = require('../models/user-model');

// Controller function to create a new user
const addUser = async (req, res) => {
    try {
        const user = new User(req.body); // Creating a new user from request body
        const savedUser = await user.save(); // Saving the user to the database
        res.status(201).json(savedUser); // Sending the saved user as a response
    } catch (err) {
        res.status(400).json({ error: err.message }); // Sending error response if any issue occurs
    }
};

// Controller function to create multiple users
const addUsers = async (req, res) => {
    try {
        const savedUsers = await User.insertMany(req.body); // Bulk insert users
        res.status(201).json(savedUsers); // Respond with inserted users
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
};

// Controller function to get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.status(200).json(users); // Respond with the list of users
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
};

// Controller function to get a single user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id); // Fetch user by ID
        res.status(200).json(user); // Respond with user details
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
};

// Controller function to update a user by ID
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // Find user by ID
            req.body, // New data to update
            { new: true } // Return updated document
        );
        res.status(200).json(updatedUser); // Respond with updated user details
    } catch (err) {
        res.status(400).json({ error: err.message }); // Handle errors
    }
};

// Controller function to delete a user by ID
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); // Delete user by ID
        res.status(200).json(deletedUser); // Respond with deleted user details
    } catch (err) {
        res.status(500).json({ error: err.message }); // Handle errors
    }
};

// Exporting all controller functions for routing
module.exports = { addUser, addUsers, getAllUsers, getUserById, updateUser, deleteUser };
```

## 4. Defining API Routes

### Create `routes/user-router.js`
```js
// Importing Express and Router
const express = require('express');
const router = express.Router();

// Importing controller functions
const { addUser, addUsers, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user-controller');

// Defining API routes and linking them with controller functions
router.post('/create', addUser); // Route to create a user
router.post('/createMany', addUsers); // Route to create multiple users
router.get('/', getAllUsers); // Route to get all users
router.get('/:id', getUserById); // Route to get a user by ID
router.put('/update/:id', updateUser); // Route to update a user by ID
router.delete('/delete/:id', deleteUser); // Route to delete a user by ID

// Exporting the router for use in the main application
module.exports = router;
```

## 5. Server Setup

### Create `server.js`
```js
// Importing required modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user-router');

const app = express(); // Creating an Express application
const PORT = 3030; // Defining the port number

app.use(cors()); // Enabling CORS for cross-origin requests
app.use(express.json()); // Middleware for parsing JSON request bodies

// Connecting to MongoDB database
mongoose
.connect('mongodb://localhost:27017/dbname', { useNewUrlParser: true, useUnifiedTopology: true }) // MongoDB Connection String
    .then(() => console.log('Connected to MongoDB')) // Log success message
    .catch((err) => console.error('Connection failed:', err)); // Log error if connection fails

// Using the user routes for handling requests related to users
app.use('/api/users', userRoutes);

// Starting the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
```

## 6. Running the Application

### Run the Node.js Server
```sh
node server.js
```

## 7. API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/api/users/create` | Add a new user      |
| POST   | `/api/users/createMany` | Add multiple users |
| GET    | `/api/users/`       | Get all users       |
| GET    | `/api/users/:id`    | Get a user by ID    |
| PUT    | `/api/users/update/:id` | Update user by ID |
| DELETE | `/api/users/delete/:id` | Delete user by ID |

This guide covers everything you need to set up a fully functional CRUD API using Node.js, Express, and MongoDB. 🚀

