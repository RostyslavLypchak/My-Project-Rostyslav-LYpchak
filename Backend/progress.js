const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing progress information
let progress = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create or Update Progress
app.put('/api/progress/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { clothesCollected, completedQuests, timeSpent } = req.body;

    // Find user's progress by user ID
    let userProgress = progress.find(prog => prog.userId === userId);

    // If user's progress doesn't exist, create new progress
    if (!userProgress) {
        userProgress = { userId };
        progress.push(userProgress);
    }

    // Update progress
    if (clothesCollected) userProgress.clothesCollected = clothesCollected;
    if (completedQuests) userProgress.completedQuests = completedQuests;
    if (timeSpent) userProgress.timeSpent = timeSpent;

    // Output: Success message with updated progress
    res.json({ message: 'Progress updated successfully', progress: userProgress });
});

// Get Progress by User ID
app.get('/api/progress/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Find user's progress by user ID
    const userProgress = progress.find(prog => prog.userId === userId);

    // Check if progress exists
    if (!userProgress) {
        return res.status(404).json({ error: 'Error: Progress not found' });
    }

    // Output: User's progress
    res.json({ progress: userProgress });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
