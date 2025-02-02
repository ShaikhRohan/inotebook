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
    const host = 'http://localhost:5000'
  //   const initialNotes = [{
      
  //       "_id": "62fd28ccd47903dcb943f9a3",
  //       "user": "62fd071c4c7c78c998233b5b",
  //       "title": "Imagination",
  //       "description": "My imagination is that i will be the top skilled person and teach the skills to others",
  //       "tag": "1st Note",
  //       "date": "2022-08-17T17:43:40.136Z",
  //       "__v": 0
      
  //   },
  //   {
      
  //     "_id": "ccd47903dcb943f9a3",
  //     "user": "62fd071c4c7c78c998233b5b",
  //     "title": "Imagiion",
  //     "description": "My imagination is that i will be the top skilled person and teach the skills to others",
  //     "tag": "1st Note",
  //     "date": "2022-08-17T17:43:40.136Z",
  //     "__v": 0
    
  // }
    
  
  // ]
    const [notes, setNotes] = useState([])
    //fetch all notes
    const getNotes = async ()=>{
      //API call
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
        // body: JSON.stringify(title,description,tag) 
      });
      // const json = response.json();
      //addNote logic
      // const note = {
      //   "_id": "62fd28ccd47903dcb943f9a3",
      //   "user": "62fd071c4c7c78c998233b5b",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2022-08-17T17:43:40.136Z",
      //   "__v": 0
      // }
      //setNotes(notes.push(note))
      //concat return new array
      // setNotes(notes.concat(note))
      const json = await response.json();
      console.log(json)
       setNotes(json)
    }
    
    //add a note
    const addNote = async (title, description, tag)=>{
      //API call
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}) 
      });
       const json = await response.json();
       console.log(json);
      //addNote logic
      // const note = {
      //   "_id": "62fd28ccd47903dcb943f9a3",
      //   "user": "62fd071c4c7c78c998233b5b",
      //   "title": title,
      //   "description": description,
      //   "tag": tag,
      //   "date": "2022-08-17T17:43:40.136Z",
      //   "__v": 0
      // }
      //setNotes(notes.push(note))
      //concat return new array
      //setNotes(notes.concat({title,description,tag}));
      setNotes(notes.concat(json));
    }
    //delete a note 
    const deleteNote = async (id)=>{
      //api 
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        //body: JSON.stringify(title,description,tag) 
      });
      const json = await response.json();
      console.log(json)
      //logic
      const newNotes = notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }
    //update a note 
    const editNote = async (id, title, description, tag)=>{
      //API Call {search 'fetch with headers'}
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag}) 
      });
      const json = await response.json(); 
      console.log(json)
      //react did not support this so we have to create newNote for it
      let newNotes = JSON.parse(JSON.stringify(notes))
      //logic for update the note
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        } 
      }
      setNotes(newNotes);
    }
  return (
    <div>
      <NoteContext.Provider value={{notes , addNote, deleteNote, editNote ,getNotes}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
