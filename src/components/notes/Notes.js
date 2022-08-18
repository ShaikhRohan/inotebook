import React , {useContext} from 'react'
import noteContext from '../../context/noteContext';
import NoteItem from '../noteitem/NoteItem';

const Notes = () => {
    const context = useContext(noteContext);
    const {notes , setNotes} = context;
  return (
    <div className='row my-3'>
    <h2>Your Note</h2>
    {notes.map((note)=>{
      return <NoteItem note={note}></NoteItem>
      //note.title
    })}
    </div>
  )
}

export default Notes
