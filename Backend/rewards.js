const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Sample database for storing rewards
let rewards = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Create Reward
app.post('/api/rewards', (req, res) => {
    const { userId, questId, clothingId } = req.body;

    // Input validation
    if (!userId || !questId || !clothingId) {
        return res.status(400).json({ error: 'Error: Missing required fields' });
    }

    // Generate unique reward ID
    const rewardId = rewards.length + 1;

    // Create new reward object
    const newReward = { id: rewardId, userId, questId, clothingId };

    // Add reward to the database
    rewards.push(newReward);

    // Output: Success message with newly created reward
    res.status(201).json({ message: 'Reward created successfully', reward: newReward });
});

// Get Reward by ID
app.get('/api/rewards/:rewardId', (req, res) => {
    const rewardId = parseInt(req.params.rewardId);

    // Find reward by ID
    const reward = rewards.find(reward => reward.id === rewardId);

    // Check if reward exists
    if (!reward) {
        return res.status(404).json({ error: 'Error: Reward not found' });
    }

    // Output: Reward information
    res.json({ reward });
});

// Get All Rewards for User
app.get('/api/rewards/user/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);

    // Find rewards for user
    const userRewards = rewards.filter(reward => reward.userId === userId);

    // Output: User's rewards
    res.json({ rewards: userRewards });
});

// Delete Reward by ID
app.delete('/api/rewards/:rewardId', (req, res) => {
    const rewardId = parseInt(req.params.rewardId);

    // Find index of reward by ID
    const index = rewards.findIndex(reward => reward.id === rewardId);

    // Check if reward exists
    if (index === -1) {
        return res.status(404).json({ error: 'Error: Reward not found' });
    }

    // Remove reward from the database
    rewards.splice(index, 1);

    // Output: Success message
    res.json({ message: 'Reward deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
