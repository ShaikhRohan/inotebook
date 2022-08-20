import React, { useContext } from 'react'
import noteContext from '../../context/noteContext';
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
    const {note} = props;
  return (
    <div className='col-md-3'>
      {/* {note.title}
      {note.description} */}
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          {/* we provide an arrow function because for delete we have to pass an argument */}
          <i onClick={()=>{deleteNote(note._id)}} className="fa-solid fa-trash-can mx-2"></i>
          <i className=" fa-solid fa-pen-to-square mx-2"></i>
        </div>
      </div>
    </div>
  )
}

export default NoteItem
