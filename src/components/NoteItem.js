import React,{ useContext } from 'react';
import NoteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const {deleteNote}= context;
  const {note,updateNote} = props;
  return (
       
        <div className='col-md-3'>
        <div className="card my-3">
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5><i className="bi bi-trash3-fill mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                <i className="bi bi-pencil-fill mx-2" onClick={()=>{updateNote(note)}}></i>
                <p className="card-text">{note.content}</p>
             
            </div>
        </div>
        </div>      
    
  )
}

export default NoteItem