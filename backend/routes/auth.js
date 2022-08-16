const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
//create a user usig Post "/api/auth" does not require authentication

router.post('/',[ 
    body('name').isLength({ min: 5 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })], (req,res)=>{
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
    User.create({

        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      }).then(user => res.json(user)).catch(err=> {console.log(err)
    res.json({error: 'This email is already taken ', message: err.message})} )
     //res.send(req.body)
})

module.exports = router