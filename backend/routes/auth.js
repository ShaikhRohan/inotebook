const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    // obj ={
    //     name :"Rohan",
    //     number: 24
    // }
    res.json([])
})

module.exports = router