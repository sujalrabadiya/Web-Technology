const User = require('../models/user-model');

// Create a new user
const addUser = async (req, res) => {
    const data = req.body;
    try {
        const user = new User(data);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get a user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Update a user by ID
const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            data
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

// Delete a user by ID
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { addUser, getAllUsers, getUserById, updateUser, deleteUser }
