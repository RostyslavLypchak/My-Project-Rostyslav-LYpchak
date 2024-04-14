const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing avatar information
let avatars = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Avatar
app.post('/api/avatars', (req, res) => {
    const { userId, imageUrl } = req.body;

    // Input validation
    if (!userId || !imageUrl) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Check if avatar already exists for the user
    if (avatars.some(avatar => avatar.userId === userId)) {
        return res.status(409).json({ error: 'Error: Avatar already exists for this user' });
    }

    // Create new avatar
    const newAvatar = { userId, imageUrl };
    avatars.push(newAvatar);

    // Output: Success message with newly created avatar
    res.status(201).json({ message: 'Avatar created successfully', avatar: newAvatar });
});

// Get Avatar by User ID
app.get('/api/avatars/:userId', (req, res) => {
    const userId = req.params.userId;

    // Find avatar by user ID
    const avatar = avatars.find(avatar => avatar.userId === userId);

    // Check if avatar exists
    if (!avatar) {
        return res.status(404).json({ error: 'Error: Avatar not found for this user' });
    }

    // Output: Avatar information
    res.json({ avatar });
});

// Update Avatar by User ID
app.put('/api/avatars/:userId', (req, res) => {
    const userId = req.params.userId;
    const { imageUrl } = req.body;

    // Find avatar by user ID
    const avatar = avatars.find(avatar => avatar.userId === userId);

    // Check if avatar exists
    if (!avatar) {
        return res.status(404).json({ error: 'Error: Avatar not found for this user' });
    }

    // Update avatar image URL
    avatar.imageUrl = imageUrl;

    // Output: Success message with updated avatar
    res.json({ message: 'Avatar updated successfully', avatar });
});

// Delete Avatar by User ID
app.delete('/api/avatars/:userId', (req, res) => {
    const userId = req.params.userId;

    // Find index of avatar by user ID
    const index = avatars.findIndex(avatar => avatar.userId === userId);

    // Check if avatar exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Avatar not found for this user' });
    }

    // Remove avatar from the database
    avatars.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Avatar deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
