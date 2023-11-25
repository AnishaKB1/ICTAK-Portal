const express = require('express');
const mongoose=require('mongoose');
const path=require('path');
const prodata = require('../model/project');
const router = express.Router();
const jwt=require('jsonwebtoken')


router.get("/view",async (req, res) => {
    try {
      const getpost = await prodata.find();
      res.json(getpost);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  });
  
router.post('/add',async (req, res) => {
    const data = new prodata({
        title: req.body.title,
        description: req.body.description,
         imageurl :req.body.imageurl,
         referenceUrl:req.body.referenceUrl
    })
  
    try {
        const dataToSave = await data.save();
        res.status(200).send("Posted Successfully")
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  })
  
  
  
  
  router.put("/update/:id",async (req, res) => {
  try {
    const id = req.params.id;
  const updateddata = req.body;
  const result = await prodata.findByIdAndUpdate(id, updateddata);
   
  res.status(200).send('Updated Successfully');
  } catch (error) {
    res.status(500).send(error);
  }
  });
  
  
  router.delete('/delete/:id',async (req, res) => {
  try {
      const id = req.params.id;
      const data = await prodata.findByIdAndDelete(id);
      res.json(`Document with ${data.title} has been deleted..`);
  }
  catch (error) {
      res.status(400).json({ message: error.message })
  }
  })


  router.get('/protitle', async (req, res) => {
    try {
      const projects = await prodata.find({}, 'title');
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
module.exports=router;