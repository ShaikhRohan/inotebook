const express = require("express");
const router = express.Router();
//schema
const User = require("../models/User");
//npm express validator
const { body, validationResult } = require("express-validator");
//is use to convert password into salt hash
const bcrypt = require('bcryptjs');
//jwt is used to create a token
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
//Route 1: create a user using Post "/api/auth/createuser" does not require authentication
//secret key must be in the .env.local file
const JWT_SECRET = 'shaikhrohan@3d'
router.post(
  "/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // obj ={
    //     name :"Rohan",
    //     number: 24
    // }
    // const user = User(req.body)
    // user.save();
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether email is exist already it is promise so use await
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res.status(400).json({ success,error: "This email is already taken" });
      }
      //create salt using bcryptjs
      const salt = await bcrypt.genSalt(10)
      //create new user
      //secPassword = req.body .password
      // The function which return promise and write in the async function we use await keyword
      const secPassword = await bcrypt.hash(req.body.password,salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        //password: req.body.password,
        password: secPassword
      });

      //   .then(user => res.json(user)).catch(err=> {console.log(err)
      // res.json({error: 'This email is already taken ', message: err.message})} )
      //res.send(req.body)
      //res.json({'Nice': 'nice'})
      //we did not send res.json we sign the token 
      const data = {
        user:{
            id:user.id
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);
      //console.log(jwtData);
      //res.json(user);
      success = true
      res.json({success, authToken});
    }
    //try end
    catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);
//end Route:1


//Route 2: now create login authenticte using POST 'localhost:5000/api/auth/login'  , no login required
router.post(
    "/login",
    [
      body("email","Enter a valid email").isEmail(),
      body("password","Password cannot be blank").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        } 
        //destructuring 
        const {email,password} = req.body;
        try {
            let user = await User.findOne({email});
           //email verification
            if(!user){
              success = false;
                return res.status(400).json({success , error: 'Please try to login with correct credentials'})
           
              }
            //bcrypt compare return true and false and compare given and existing password and it is async function
            const passwordCompare = await bcrypt.compare(password, user.password)
            //password verification
            if(!passwordCompare){
              success = false;
                return res.status(400).json({success, error: 'Please try to login with correct credentials'}) 
            
              }
            //sending the payload
            const data = {
                user:{
                    id:user.id
                }
              }
              success = true;
              const authToken = jwt.sign(data, JWT_SECRET);
              res.json({success,authToken});

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error Occured");   
        }
    })
 
    //Route 3: Get logged in user detail using : POST 'localhost:5000/api/auth/getuser' login is required 
   //to maintain scalablity we add middleware by which we only have to add middleware and go on....
    router.post(
      "/getuser", fetchuser ,async (req, res) => {
    try {
      userid = req.user.id;
      const user = await User.findById(userid).select('-password');
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Logged in error occured');
    } 
  })
module.exports = router;
//install jason web token
//install bcryptjs