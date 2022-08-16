const express = require('express');
const router = express.Router();
const User = require('../models/User')
//create a user usig Post "/api/auth" does not require authentication

router.post('/', (req,res)=>{
    // obj ={
    //     name :"Rohan",
    //     number: 24
    // }
    const user = User(req.body)
    user.save();
    console.log(req.body);
    res.send(req.body)
})

module.exports = router