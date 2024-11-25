const express = require('express');
const User = require('../models/User');
const { body, matchedData, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var fetchuser = require('./middleware/fetchuser');
const JWT_SECRET = "$$ITHUvaliyasHal34##yam";


//Route 1: Define your notes route
router.post('/createuser', 
    body('name','Enter a valid name').notEmpty(),
    body('username','Enter a valid username').isEmail(),
    body('email','Enter a valid email').isEmail(),
    body('password','Wrong password format').isLength({min: 5}), async (req, res) => {
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const data = matchedData(req);          
          
          //check whether the user exists already
          let user = await User.findOne({email: data.email});

          if(user){
             return res.status(400).json({error: "Sorry a user with this email already exists"})
          }else{

 
          const salt = await bcrypt.genSalt(10);
          const secPass = await bcrypt.hash(data.password, salt);

          user = await User.create({
            name: data.name,
            username: data.username,
            email: data.email,
            password: secPass
          })

          const datatoken = {
            
              user: {
                id: user.id
              }
            
          }
          const token = await jwt.sign(datatoken, JWT_SECRET);
       
          res.json({token})
        }
                  
          
        }else{
        res.send({ errors: result.array() });
        }            
    } catch (err) {
        res.json("Router error");
        res.status(500).send("Some error occured");
    }
  });
  
  //Route 2: create login route
  router.post('/login', 
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(), async (req, res) => {
    try {
        let sucess = false;
        const result = validationResult(req);
        if (result.isEmpty()) {
          const data = matchedData(req);           
          
          //check whether the user exists already
          let user = await User.findOne({email: data.email});
          
          if(!user){
            sucess = false;
             return res.status(400).json({sucess, error: "Please try to login with correct credentials"})
          }
 
          const passwordCompare = await bcrypt.compare(data.password, user.password);
          if(!passwordCompare){
            sucess = false;
            return res.status(400).json({sucess, error: "Please try to login with correct credentials"});
          }

          const payload = {
            
              user: {
                id: user.id
              }
            
          }
          const token = await jwt.sign(payload, JWT_SECRET);
          sucess = true;
          res.json({sucess, token})                          
          
        }else{
        res.status(400).json({ errors: result.array() });
        }            
    } catch (err) {
        sucess = false;
        res.status(500).send("Internal server error occured");
    }
  });

  //Route 3: Get logged in user details using: "/api/auth/getuser". Login required.

  router.post('/getuser', fetchuser, async (req, res) => {
    try {        
          //check whether the user exists already
          userId = req.user.id;
          console.info(userId);
          const user = await User.findById(userId).select("-password");
          
          res.send(user);                                                         
    } catch (err) {
        
        res.status(500).send("Internal server error occured");
    }
  });


  module.exports = router