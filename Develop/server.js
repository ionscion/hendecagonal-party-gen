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
  // Get the new note from the request body
  const newNote = req.body;

  // Generate a unique ID for the new note using the uuid module
  newNote.id = uuid.v4();

  // Read the current notes from db.json
  const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));

  // Add the new note to the array of notes
  currentNotes.push(newNote);

  // Write the updated array of notes to db.json
  fs.writeFileSync("./db/db.json", JSON.stringify(currentNotes));

  // Send the new note back to the client
  res.json(newNote);
  console.info(`${req.method} request received`);
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
