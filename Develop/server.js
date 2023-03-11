const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const dbData = require("./db/db.json");
const uuid = require('uuid');
const PORT = process.env.PORT || 3001;

const ref = (req, res, next) => {
  res.refresh = () => {
          res.redirect(req.originalUrl);
        };
        next();
};

app.use(ref);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//todo - * directory thing

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/api/notes", (req, res) => res.json(dbData));

app.post("/api/notes", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  currentNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(currentNotes));
  res.json(newNote);
  console.info(`${req.method} request received`);
});

app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  const updatedNotes = currentNotes.filter((note) => note.id !== noteId);
  fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));
  res.json({ message: 'Note deleted successfully' });
  console.info('Note deleted successfully');
});



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
