import React, { useState,useContext, useEffect , useRef } from "react";
import noteContext from "../../context/noteContext";
import AddNote from "../addnote/AddNote";
import NoteItem from "../noteitem/NoteItem";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  const [note, setNote] = useState({etitle :'', edescription: '', etag: ''});
  const handleClick=(e)=>{
    //preventDefault did not allow to reload the page
    e.preventDefault();
    //  addNote(note.etitle,note.edescription,note.etag);
  
}
//e is representing an event
const onChange=(e)=>{
    //spread opeartor ...
    setNote({...note, [e.target.name] : e.target.value})
}
  const ref = useRef(null);
  const updateNote = (currentNote) => {
    // ref.toggle();
    ref.current.click();
    //setNote(currentNote);
    setNote({etitle : currentNote.title , edescription : currentNote.description, etag: currentNote.tag})
  };
  return (
    <>
      <AddNote></AddNote>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="etitle" className="form-label">Title</label>
          <input type="text" onChange={onChange} className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">Description</label>
          <input type="text" onChange={onChange} value={note.edescription}  className="form-control" id="edescription" name='edescription' />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">Tag</label>
          <input type="text" value={note.etag} onChange={onChange}  className="form-control" id="etag" name='etag' />
        </div>
      </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} className="btn btn-primary">Update Changes</button>
      </div>
    </div>
  </div>
</div>
      <div className="row my-3">
        <h2>Your Note</h2>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              note={note}
              updateNote={updateNote}
            ></NoteItem>
          );
          //note.title
        })}
      </div>
    </>
  );
};

export default Notes;
