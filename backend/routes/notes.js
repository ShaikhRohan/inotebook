const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
//express validator
const { body, validationResult } = require("express-validator");
//Route 1: Get All the notes detail using : GET 'localhost:5000/api/notes/fetchallnotes' login is required
router.get(
  "/fetchallnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 5 }),
    //body("email").isEmail(),
    body("description", "The description is greater then 10 words").isLength({
      min: 11,
    }),
  ],
  async (req, res) => {
    //get all the notes by requesting id
    try {
      const notes = await Notes.find({ user: req.user.id });
      res.json(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

//Route 2: insert a new note using : POST 'localhost:5000/api/notes/addnote' login is required
router.post("/addnote", fetchuser, async (req, res) => {
  //destructuring
  try {
    const { title, description, tag } = req.body;
    //get all the notes by requesting id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //if no error is occur then we create a new note
    const note = new Notes({
      //return a promise
      title,
      description,
      tag,
      user: req.user.id,
    });
    //return the note
    const saveNote = await note.save();
    res.json(saveNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

module.exports = router;
