const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()

router.use(express.urlencoded({ extended: true }));
router.use(express.json());




function verifytoken(req,res,next){
    try{
      const token= req.headers.token;
      console.log(token);
      if(!token) throw 'Unauthorized';
      let payload=jwt.verify(token,'reactictapp');
      if(!payload) throw 'Unauthorized';
      //res.staus(200).send(payload);
      next();
  
    }catch(error){
      res.status(401).send(error);
    }
  }

router.post('/login',async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const adminEmail = 'admin@gmail.com';
      const adminPassword = 'admin123';
  
      if (email === adminEmail && password === adminPassword) {
        // Admin login
        const payload = { email: adminEmail };
        const token = jwt.sign(payload, 'reactictapp');
        res.status(200).json({ message: 'success', token });
  } 
  // else {
  //       // User login
  //       const foundUser = await employeedata.findOne({ email, password });
  
  //       if (foundUser) {
  //         let payload ={email:email,password:password};
  //         let token = jwt.sign(payload,'reactictapp');
  
  //          res.status(200).send({message:'success',token:token});
  //      } else {
  //          res.status(401).send('Invalid credentials');
  //      }
  //  }
   } catch (error) {
       console.error('Error during login:', error);
       res.status(500).send(error);
   }
  });

  module.exports=router;