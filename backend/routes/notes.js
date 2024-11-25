const express = require('express');
const router = express.Router();
var fetchuser = require('./middleware/fetchuser');
const Note = require('../models/Notes');
const { body, matchedData, validationResult } = require('express-validator');

// Route 1: Get All the notes using: GET "api/notes/getuser".Login required
router.get('/fetchallnotes',fetchuser, async (req, res) => {
    try {
      const notes = await Note.find({user: req.user.id});     
      res.json(notes);
    } catch (err) {
        res.json("Notes fetching error");
    }
  });

  // Route 2: add a new note using: GET "api/notes/addnote".Login required
  router.post('/addnote',fetchuser, 
  body('title','Enter a valid title').isLength({min:3}),
  body('content','Enter a valid content').isLength({min:5}), async (req, res) => {
          
    try {
      const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status().json({ errors: errors.array() });
        }

        const data = matchedData(req); 

        const note = await Note.create({
          title: data.title,
          content: data.content,
          tag: data.tag,
          user: req.user.id
        })
       
        res.json(note);

    } catch (err) {
        res.json("Add Note error");
    }
  });

   // Route 3: update a note using: GET "api/notes/updatenote".Login required
   router.put('/updatenote/:id',fetchuser, 
   async (req, res) => {         
     try {      
         const {title,content,tag} = req.body; 
         const newNote = {};
         
         if(title){newNote.title = title}
         if(content){newNote.content = content}
         if(tag){newNote.tag = tag}
         
         let note = await Note.findById(req.params.id);
         if(!note){return res.status(400).send("Note not found")}

         if(note.user.toString() !== req.user.id ){
          return res.status(400).send("Not allowed")
         }   
         
         note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});       
         res.json(note);
 
     } catch (err) {
         res.json("Update Note error");
     }
   });

    // Route 4: delete a note using: GET "api/notes/deletenote".Login required
    router.delete('/deletenote/:id',fetchuser, 
    async (req, res) => {         
      try {      

          let note = await Note.findById(req.params.id);
          if(!note){return res.status(400).send("Note not found")}
 
          if(note.user.toString() !== req.user.id ){
           return res.status(400).send("Not allowed")
          }   
          
          note = await Note.findByIdAndDelete(req.params.id);       
          res.json({"success": "Note has been deleted",note:note});
  
      } catch (err) {
          res.json("Update Note error");
      }
    });

  module.exports = router