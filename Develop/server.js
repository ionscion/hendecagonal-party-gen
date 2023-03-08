const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const dbData = require("./db/db.json");
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(dbData));

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  // Add the new note to the array of notes
  currentNotes.push(newNote);
  // Write the updated array of notes to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(currentNotes));
  // Send the new note back to the client
  res.json(newNote);
  console.info(`${req.method} request received`);
});

app.delete("/api/notes/:id", (req, res) => {
  // Get the ID of the note to delete from the request parameters
  const noteId = req.params.id;
  // Read the current notes from db.json
  const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  // Filter out the note with the specified ID
  const updatedNotes = currentNotes.filter((note) => note.id !== noteId);
  // Write the updated array of notes to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));
  // Send a success message back to the client
  res.json({ message: 'Note deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
