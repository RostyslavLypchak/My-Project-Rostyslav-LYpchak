const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing help records
let helpRecords = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Help Record
app.post('/api/help-records', (req, res) => {
    const { userId, questId, points } = req.body;

    // Input validation
    if (!userId || !questId || !points) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Generate unique help record ID
    const helpRecordId = helpRecords.length + 1;

    // Create new help record object
    const newHelpRecord = { id: helpRecordId, userId, questId, points };

    // Add help record to the database
    helpRecords.push(newHelpRecord);

    // Output: Success message with newly created help record
    res.status(201).json({ message: 'Help record created successfully', helpRecord: newHelpRecord });
});

// Get Help Records by User ID
app.get('/api/help-records/user/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Find help records for user
    const userHelpRecords = helpRecords.filter(helpRecord => helpRecord.userId === userId);

    // Output: User's help records
    res.json({ helpRecords: userHelpRecords });
});

// Delete Help Record by ID
app.delete('/api/help-records/:helpRecordId', (req, res) => {
    const helpRecordId = parseInt(req.params.helpRecordId);

    // Find index of help record by ID
    const index = helpRecords.findIndex(helpRecord => helpRecord.id === helpRecordId);

    // Check if help record exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Help record not found' });
    }

    // Remove help record from the database
    helpRecords.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Help record deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
