const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router()
const mentordata = require('../model/mentor');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

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
else {
      // User login
      const foundUser = await mentordata.findOne({ email, password });

      if (foundUser) {
        let payload ={email:email,password:password};
        let token = jwt.sign(payload,'reactictapp');

         res.status(200).send({message:'success',token:token});
     } else {
         res.status(401).send('Invalid credentials');
     }
 }
 } catch (error) {
     console.error('Error during login:', error);
     res.status(500).send(error);
 }
});


module.exports = router;
