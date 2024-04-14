const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing events
let events = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Event
app.post('/api/events', (req, res) => {
    const { name, duration, quests } = req.body;

    // Input validation
    if (!name || !duration || !quests || !Array.isArray(quests)) {
        return res.status(400).json({ error: 'Error: Invalid event data' });
    }

    // Generate unique event ID
    const eventId = events.length + 1;

    // Create new event object
    const newEvent = { id: eventId, name, duration, quests };

    // Add event to the database
    events.push(newEvent);

    // Output: Success message with newly created event
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
});

// Get Event by ID
app.get('/api/events/:eventId', (req, res) => {
    const eventId = parseInt(req.params.eventId);

    // Find event by ID
    const event = events.find(event => event.id === eventId);

    // Check if event exists
    if (!event) {
        return res.status(404).json({ error: 'Error: Event not found' });
    }

    // Output: Event information
    res.json({ event });
});

// Delete Event by ID
app.delete('/api/events/:eventId', (req, res) => {
    const eventId = parseInt(req.params.eventId);

    // Find index of event by ID
    const index = events.findIndex(event => event.id === eventId);

    // Check if event exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Event not found' });
    }

    // Remove event from the database
    events.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Event deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
