const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult, check } = require("express-validator");
const Note = require("../models/Note");

//route 1 : get all the notes using : GET "/api/notes/fetchallnotes" .  login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);    
    res.status(500).send("INTERNAL SERVER ERROR");
}
});

//route 2 : Add New notes using : POST "/api/notes/addnote" .  login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "minimum length of description should be 5").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there are any errors , return BAD request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch(error) {
        console.error(error.message);    
        res.status(500).send("INTERNAL SERVER ERROR");
    }
  }
);


//route 3 : update the existing notes using : PUT "/api/notes/updatenote/:id" .  login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
      const {title , description , tag} = req.body;
      //create a newNote object 
      try {
      const newNote = {};
      if (title) {
        newNote.title=title;
      }
      if (description) {
        newNote.description=description;
      }
      if (tag) {
        newNote.tag=tag;
      }

      // find the note to be updated and update it .

      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note= await Note.findByIdAndUpdate(req.params.id , {$set: newNote} , {new : true});
      res.json({note});
    } catch(error) {
      console.error(error.message);    
      res.status(500).send("INTERNAL SERVER ERROR");
  }


});


//route 4 : Delete the existing notes using : DELETE "/api/notes/deletenote/:id" .  login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
      const {title , description , tag} = req.body;
      // find the note to be deleted and delete it .
      try {
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }

      // Allow the user to delete if only and only if the the note belong to that user 
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note= await Note.findByIdAndDelete(req.params.id);
      res.json({"Success" : "the note has been deleted" , "note":note});
    } catch(error) {
      console.error(error.message);    
      res.status(500).send("INTERNAL SERVER ERROR");
  }

});


module.exports = router;
