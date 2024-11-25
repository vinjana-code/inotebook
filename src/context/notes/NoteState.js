import React, { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
   
    const [notes,setNotes] = useState(notesInitial);

      // Fetch all note
      const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("authtoken")
          }
        });
        const json = await response.json();
        setNotes(json);

      }
  

    // Add a Note
    const addNote = async (title,content,tag) => {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken")
        },
        body: JSON.stringify({title,content,tag}) // body data type must match "Content-Type" header
      });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // Delete a note
    const deleteNote = async (id) => {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken")
        }
      });
      const jsonval = response.json(); 
      const newNotes = notes.filter((note) => {return note._id !== id})   
      setNotes(newNotes)
    }

    // Edit a note
    const editNote = async(id,title,content,tag) => {
        
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("authtoken")
        },
        body: JSON.stringify({title,content,tag}), // body data type must match "Content-Type" header
      });
      //const jsonval = await response.json(); 
      const newNotes = JSON.parse(JSON.stringify(notes));
        for(let index = 0;index < newNotes.length; index++){
         
            if(newNotes[index]._id === id ){
              newNotes[index].title = title;
              newNotes[index].content = content;
              newNotes[index].tag = tag;
              break;
            }
           
        }
        console.info(newNotes);
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{notes,addNote, deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;