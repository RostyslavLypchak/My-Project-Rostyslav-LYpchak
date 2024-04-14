const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing notifications
let notifications = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Notification
app.post('/api/notifications', (req, res) => {
    const { questId, message, time } = req.body;

    // Input validation
    if (!questId || !message || !time) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Generate unique notification ID
    const notificationId = notifications.length + 1;

    // Create new notification object
    const newNotification = { id: notificationId, questId, message, time };

    // Add notification to the database
    notifications.push(newNotification);

    // Output: Success message with newly created notification
    res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
});

// Get Notification by ID
app.get('/api/notifications/:notificationId', (req, res) => {
    const notificationId = parseInt(req.params.notificationId);

    // Find notification by ID
    const notification = notifications.find(notification => notification.id === notificationId);

    // Check if notification exists
    if (!notification) {
        return res.status(404).json({ error: 'Error: Notification not found' });
    }

    // Output: Notification information
    res.json({ notification });
});

// Delete Notification by ID
app.delete('/api/notifications/:notificationId', (req, res) => {
    const notificationId = parseInt(req.params.notificationId);

    // Find index of notification by ID
    const index = notifications.findIndex(notification => notification.id === notificationId);

    // Check if notification exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Notification not found' });
    }

    // Remove notification from the database
    notifications.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Notification deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
