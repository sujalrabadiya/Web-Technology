const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user-router');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose
    .connect('mongodb://localhost:27017/demo')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection failed:', err));
   

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
