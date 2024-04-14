const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing quests
let quests = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Quest
app.post('/api/quests', (req, res) => {
    const { title, description, difficulty, reward, helpNeeded } = req.body;

    // Input validation
    if (!title || !description || !difficulty || !reward) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Generate unique quest ID
    const questId = quests.length + 1;

    // Create new quest object
    const newQuest = { id: questId, title, description, difficulty, reward, helpNeeded };

    // Add quest to the database
    quests.push(newQuest);

    // Output: Success message with newly created quest
    res.status(201).json({ message: 'Quest created successfully', quest: newQuest });
});

// Get Quest by ID
app.get('/api/quests/:questId', (req, res) => {
    const questId = parseInt(req.params.questId);

    // Find quest by ID
    const quest = quests.find(quest => quest.id === questId);

    // Check if quest exists
    if (!quest) {
        return res.status(404).json({ error: 'Error: Quest not found' });
    }

    // Output: Quest information
    res.json({ quest });
});

// Get All Quests
app.get('/api/quests', (req, res) => {
    // Output: All quests
    res.json({ quests });
});

// Delete Quest by ID
app.delete('/api/quests/:questId', (req, res) => {
    const questId = parseInt(req.params.questId);

    // Find index of quest by ID
    const index = quests.findIndex(quest => quest.id === questId);

    // Check if quest exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Quest not found' });
    }

    // Remove quest from the database
    quests.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Quest deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
