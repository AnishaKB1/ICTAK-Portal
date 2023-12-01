const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Mentor = require('../model/mentor');
const Project = require('../model/project');
const student =require('../model/student');
const Submission =require('../model/submission');
const verifytoken = require('./basic');




// Fetch submissions based on batch or project
router.get('/mentor/submissions', async (req, res) => {
    const { id, batchOrProjectId } = req.query;
  
    try {
      let query = { mentorId: mongoose.Types.ObjectId(id) };
  
      if (batchOrProjectId) {
        if (mongoose.Types.ObjectId.isValid(batchOrProjectId)) {
          query.projectId = mongoose.Types.ObjectId(batchOrProjectId);
        } else {
          query.batchId = batchOrProjectId;
        }
      }
  
      const submissions = await Submission.find(query)
        .populate('studentId', 'name batch email')
        .populate('projectId', 'title')
        .exec();
  
      res.json(submissions);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  module.exports=router;  
