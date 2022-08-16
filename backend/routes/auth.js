const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//create a user usig Post "/api/auth/createuser" does not require authentication
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
        return res.status(400).json({ error: "This email is already taken" });
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
      res.json({authToken});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

module.exports = router;
//install jason web token
//install bcryptjs