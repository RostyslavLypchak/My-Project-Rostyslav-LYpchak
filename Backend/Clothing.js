const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database to store clothing information
let clothing = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Clothing
app.post('/api/clothing', (req, res) => {
    const { name, type, color } = req.body;

    // Input validation
    if (!name || !type || !color) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Generate unique clothing ID
    const clothingId = clothing.length + 1;

    // Create new clothing object
    const newClothing = { id: clothingId, name, type, color };

    // Add clothing to the database
    clothing.push(newClothing);

    // Output: Success message with newly created clothing
    res.status(201).json({ message: 'Clothing created successfully', clothing: newClothing });
});

// Get Clothing by ID
app.get('/api/clothing/:clothingId', (req, res) => {
    const clothingId = parseInt(req.params.clothingId);

    // Find clothing by ID
    const cloth = clothing.find(cloth => cloth.id === clothingId);

    // Check if clothing exists
    if (!cloth) {
        return res.status(404).json({ error: 'Error: Clothing not found' });
    }

    // Output: Clothing information
    res.json({ clothing: cloth });
});

// Update Clothing by ID
app.put('/api/clothing/:clothingId', (req, res) => {
    const clothingId = parseInt(req.params.clothingId);
    const { name, type, color } = req.body;

    // Find clothing by ID
    const cloth = clothing.find(cloth => cloth.id === clothingId);

    // Check if clothing exists
    if (!cloth) {
        return res.status(404).json({ error: 'Error: Clothing not found' });
    }

    // Update clothing details
    if (name) cloth.name = name;
    if (type) cloth.type = type;
    if (color) cloth.color = color;

    // Output: Success message with updated clothing
    res.json({ message: 'Clothing updated successfully', clothing: cloth });
});

// Delete Clothing by ID
app.delete('/api/clothing/:clothingId', (req, res) => {
    const clothingId = parseInt(req.params.clothingId);

    // Find index of clothing by ID
    const index = clothing.findIndex(cloth => cloth.id === clothingId);

    // Check if clothing exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Clothing not found' });
    }

    // Remove clothing from the database
    clothing.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Clothing deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
