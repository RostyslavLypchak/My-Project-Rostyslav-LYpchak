const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing daily facts
let dailyFacts = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Daily Fact
app.post('/api/daily-facts', (req, res) => {
    const { fact, category } = req.body;

    // Input validation
    if (!fact || !category) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Generate unique fact ID
    const factId = dailyFacts.length + 1;

    // Create new fact object
    const newFact = { id: factId, fact, category };

    // Add fact to the database
    dailyFacts.push(newFact);

    // Output: Success message with newly created fact
    res.status(201).json({ message: 'Daily fact created successfully', fact: newFact });
});

// Get Daily Fact by ID
app.get('/api/daily-facts/:factId', (req, res) => {
    const factId = parseInt(req.params.factId);

    // Find fact by ID
    const fact = dailyFacts.find(fact => fact.id === factId);

    // Check if fact exists
    if (!fact) {
        return res.status(404).json({ error: 'Error: Fact not found' });
    }

    // Output: Fact information
    res.json({ fact });
});

// Update Daily Fact by ID
app.put('/api/daily-facts/:factId', (req, res) => {
    const factId = parseInt(req.params.factId);
    const { fact, category } = req.body;

    // Find fact by ID
    const existingFact = dailyFacts.find(fact => fact.id === factId);

    // Check if fact exists
    if (!existingFact) {
        return res.status(404).json({ error: 'Error: Fact not found' });
    }

    // Update fact details
    if (fact) existingFact.fact = fact;
    if (category) existingFact.category = category;

    // Output: Success message with updated fact
    res.json({ message: 'Daily fact updated successfully', fact: existingFact });
});

// Delete Daily Fact by ID
app.delete('/api/daily-facts/:factId', (req, res) => {
    const factId = parseInt(req.params.factId);

    // Find index of fact by ID
    const index = dailyFacts.findIndex(fact => fact.id === factId);

    // Check if fact exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Fact not found' });
    }

    // Remove fact from the database
    dailyFacts.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Daily fact deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
