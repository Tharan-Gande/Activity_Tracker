const express = require('express');
const Activity = require('../models/Activity'); // Reference to your Activity model
const router = express.Router();

// Route to create a new activity
router.post('/', async (req, res) => {
  try {
    const { name, date } = req.body;

    if (!name || !date) {
      return res.status(400).json({ error: 'Name and date are required.' });
    }

    const newActivity = new Activity({ name, date });

    await newActivity.save();

    return res.status(201).json({
      message: 'Activity created successfully',
      activity: newActivity,
    });
  } catch (error) {
    console.error('Error creating activity:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find(); // Retrieve all activities from MongoDB
    return res.status(200).json(activities); // Return the list of activities
  } catch (error) {
    console.error('Error retrieving activities:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});




// Route to update activity status
router.patch('/:id', async (req, res) => {
   console.log("hello")
   try {
      const { id } = req.params;
      const { status } = req.body;
  
      const updatedActivity = await Activity.findByIdAndUpdate(
        id,
        { status },
        { new: true } // Return the updated document
      );
  
      if (!updatedActivity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
  
      return res.status(200).json(updatedActivity);
    } catch (error) {
      console.error('Error updating activity status:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
