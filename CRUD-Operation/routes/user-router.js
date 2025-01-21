const express = require('express');
const router = express.Router();
const { addUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/user-controller')

// Create a new user
router.post('/create', addUser);

// Get all users
router.get('/', getAllUsers);

// Get a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/update/:id', updateUser);

// Delete a user by ID
router.delete('/delete/:id', deleteUser);

module.exports = router;
