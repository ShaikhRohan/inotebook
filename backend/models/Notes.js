const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
   //we add user as a foreign key by which it only get the notes realted to the particular id
   user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
   },
   title:{
    type: String,
    required: true
   },
   description:{
    type: String,
    required: true
   },
   tag:{
    type: String
   },
   date:{
    type: Date,
    default: Date.now
   }
  });

  module.exports = mongoose.model('notes', NotesSchema);