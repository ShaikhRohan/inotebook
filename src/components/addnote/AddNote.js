import React, {useContext, useState} from 'react'
import noteContext from '../../context/noteContext';
const AddNote = () => {
    const context = useContext(noteContext);
    //add a state hook for onChange function
    const [note, setNote] = useState({title :'', description: '', tag: 'Default'});
    const {addNote} = context;
    const handleClick=(e)=>{
        //preventDefault did not allow to reload the page
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
      
    }
    //e is representing an event
    const onChange=(e)=>{
        //spread opeartor ...
        setNote({...note, [e.target.name] : e.target.value})
    }
  return (
    <div>
       <div className='container my-3'>
      <h2>Add a Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" onChange={onChange} className="form-control" id="title" name='title' aria-describedby="emailHelp" />
          {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" onChange={onChange}  className="form-control" id="description" name='description' />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add New Note</button>
      </form>
      {/*  */}
   {/* <Notes></Notes> */}
   {/*  */}
    </div>
    </div>
  )
}

export default AddNote
