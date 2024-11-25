import React,{useContext, useState} from 'react';
import NoteContext from '../context/notes/noteContext';

const AddNote = () => {
    const context = useContext(NoteContext);
    const {addNote}= context;
    const [note,setNote] = useState({title:"",content:"",tag:""});
    const handleClick = (e) => {
      e.preventDefault();
      addNote(note.title,note.content,note.tag);
      setNote({title:"",content:"",tag:""})
    }
   
    const onChange = (e) => {
      setNote({...note,[e.target.name]: e.target.value});
    }
  return (
    <div>
      <div className='py-3'><h3>Add a note</h3></div>
      <form>
  <div className="form-group">
    <label htmlFor="title">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} placeholder="Enter title" 
    onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="content">Description</label>
    <input type="text" className="form-control" id="content" name='content' placeholder="Description" value={note.content} onChange={onChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="tag">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag' placeholder="Tag" value={note.tag} onChange={onChange}/>
  </div>

  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>


    </div>
  )
}

export default AddNote