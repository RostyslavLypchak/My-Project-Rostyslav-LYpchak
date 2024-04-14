const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing user information
let users = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create User
app.post('/api/users', (req, res) => {
    const { username, email } = req.body;

    // Input validation
    if (!username || !email) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Check if user already exists
    if (users.some(user => user.email === email)) {
        return res.status(409).json({ error: 'Error: Email is already in use' });
    }

    // Generate unique user ID
    const userId = users.length + 1;

    // Create new user object
    const newUser = { userId, username, email };

    // Add user to the database
    users.push(newUser);

    // Output: Success message with newly created user
    res.status(201).json({ message: 'User created successfully', user: newUser });
});

// Get User by User ID
app.get('/api/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Find user by user ID
    const user = users.find(user => user.userId === userId);

    // Check if user exists
    if (!user) {
        return res.status(404).json({ error: 'Error: User not found' });
    }

    // Output: User information
    res.json({ user });
});

// Update User by User ID
app.put('/api/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { username, email } = req.body;

    // Find user by user ID
    const user = users.find(user => user.userId === userId);

    // Check if user exists
    if (!user) {
        return res.status(404).json({ error: 'Error: User not found' });
    }

    // Update user details
    if (username) user.username = username;
    if (email) user.email = email;

    // Output: Success message with updated user
    res.json({ message: 'User updated successfully', user });
});

// Delete User by User ID
app.delete('/api/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Find index of user by user ID
    const index = users.findIndex(user => user.userId === userId);

    // Check if user exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: User not found' });
    }

    // Remove user from the database
    users.splice(index, 1);

    // Output: Success message
    res.json({ message: 'User deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
