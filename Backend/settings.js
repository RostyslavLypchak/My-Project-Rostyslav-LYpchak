const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing user settings
let settings = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create or Update Settings
app.put('/api/settings/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { theme, newUsername, newEmail } = req.body;

    // Find user's settings by user ID
    let userSettings = settings.find(setting => setting.userId === userId);

    // If user's settings don't exist, create new settings
    if (!userSettings) {
        userSettings = { userId };
        settings.push(userSettings);
    }

    // Update settings
    if (theme) userSettings.theme = theme;
    if (newUsername) userSettings.newUsername = newUsername;
    if (newEmail) userSettings.newEmail = newEmail;

    // Output: Success message with updated settings
    res.json({ message: 'Settings updated successfully', settings: userSettings });
});

// Get Settings by User ID
app.get('/api/settings/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Find user's settings by user ID
    const userSettings = settings.find(setting => setting.userId === userId);

    // Check if settings exist
    if (!userSettings) {
        return res.status(404).json({ error: 'Error: Settings not found' });
    }

    // Output: User's settings
    res.json({ settings: userSettings });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
