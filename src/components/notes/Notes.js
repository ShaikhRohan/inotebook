import React , {useContext} from 'react'
import noteContext from '../../context/noteContext';
import AddNote from '../addnote/AddNote';
import NoteItem from '../noteitem/NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes} = context;
  return (
    <>
    <AddNote></AddNote>
    <div className='row my-3'>
    <h2>Your Note</h2>
    {notes.map((note)=>{
      return <NoteItem key={note._id} note={note}></NoteItem>
      //note.title
    })}
    </div>
    </>
  )
}

export default Notes
