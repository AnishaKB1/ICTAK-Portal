const express = require('express');
const mongoose=require('mongoose');
const path=require('path');
const prodata = require('../model/project');
const router = express.Router();
const jwt=require('jsonwebtoken')


router.get("/",async (req, res) => {
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
         imageurl :req.body.imageurl
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
   
    res.status(200).json(result);
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
module.exports=router;