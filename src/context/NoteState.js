import React, { useState } from 'react'
import NoteContext from './noteContext'
const NoteState = (props) => {
    // const state = {
    //     "name" : "Rohan",
    //     "status" : "Single"
    // }
    // const [state, setState] = useState({
    //     "name" : "Rohan",
    //     "status" : "Single"
    // }
    // )
    // const update= ()=>{
    //     setTimeout(() => {
    //         setState({
    //             "name" : "Shaikh",
    //             "status" : "Married 4(Wives)"
    //         })
    //     }, 1000);
    // }
    const initialNotes = [{
      
        "_id": "62fd28ccd47903dcb943f9a3",
        "user": "62fd071c4c7c78c998233b5b",
        "title": "Imagination",
        "description": "My imagination is that i will be the top skilled person and teach the skills to others",
        "tag": "1st Note",
        "date": "2022-08-17T17:43:40.136Z",
        "__v": 0
      
    },
    {
      
      "_id": "ccd47903dcb943f9a3",
      "user": "62fd071c4c7c78c998233b5b",
      "title": "Imagiion",
      "description": "My imagination is that i will be the top skilled person and teach the skills to others",
      "tag": "1st Note",
      "date": "2022-08-17T17:43:40.136Z",
      "__v": 0
    
  }
    
  
  ]
    const [notes, setNotes] = useState(initialNotes)
    //add a note
    const addNote =(title, description, tag)=>{
      const note = {
        "_id": "62fd28ccd47903dcb943f9a3",
        "user": "62fd071c4c7c78c998233b5b",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2022-08-17T17:43:40.136Z",
        "__v": 0
      }
      //setNotes(notes.push(note))
      //concat return new array
      setNotes(notes.concat(note))
    }
    //delete a note 
    const deleteNote =(id)=>{
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }
    //update a note 
    const updateNote = (id)=>{

    }
  return (
    <div>
      <NoteContext.Provider value={{notes , addNote, deleteNote, updateNote}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
