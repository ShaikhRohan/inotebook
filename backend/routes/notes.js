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

//Route 3: Update an existing note using : PUT 'localhost:5000/api/notes/updatenote' login is required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  //destructuring
  try {
    const { title, description, tag } = req.body;
    //create new note object
    const newNote = {};
    if(title){
      newNote.title = title;
    }
    if(description){
      newNote.description = description;
    }
    if(tag){
      newNote.tag = tag;
    }
    //find the note to be updated and update it
    //for the security purpose we did not use findByIdAndUpdate method because it will cause to hack by site
    //const note = Notes.findByIdAndUpdate()
    let note = await Notes.findById(req.params.id);
    if(!note){
      //Not found error is 404
     return res.status(404).send('Not Found');
    }

    //check the requesting user id matches the loginized id
    if(note.user.toString() !== req.user.id){
            //unauthorized error is 401
      return res.status(401).send('Not Allowed');
    }
    //now we can update the note
    //new:true means when the new content is there then it will be create
    note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote} , {new:true});
    res.json({note});
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {

    //   return res.status(400).json({ errors: errors.array() });
    // }
    
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})


//Route 4: Delete an existing note using : DELETE 'localhost:5000/api/notes/deletenote/:id' login is required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  //destructuring
  try {
   // const { title, description, tag } = req.body;
    //create new note object
    // const newNote = {};
    // if(title){
    //   newNote.title = title;
    // }
    // if(description){
    //   newNote.description = description;
    // }
    // if(tag){
    //   newNote.tag = tag;
    // }
    //find the note to be deleted and delete it
    //for the security purpose we did not use findByIdAndDelete method because it will cause to hack by site
    //const note = Notes.findByIdAndDelete()
    let note = await Notes.findById(req.params.id);
    if(!note){
      //Not found error is 404
     return res.status(404).send('Not Found');
    }

    //check the requesting user id matches the loginized id
    if(note.user.toString() !== req.user.id){
            //unauthorized error is 401
      return res.status(401).send('Not Allowed');
    }
    //now we can update the note
    //new:true means when the new content is there then it will be create
    //note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote} , {new:true});
    note = await Notes.findByIdAndDelete(req.params.id, );
    res.json({'Success': 'Note has been deleted!', note:note});
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {

    //   return res.status(400).json({ errors: errors.array() });
    // }
    
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})
module.exports = router;
