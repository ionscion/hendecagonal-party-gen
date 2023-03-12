const notes = require("express").Router();
const express = require("express");
const fs = require("fs");
const path = require("path");
const dbPath = path.join(__dirname, "..", "db", "db.json");
const uuid = require("uuid");

notes.use(express.json());
notes.use(express.urlencoded({ extended: true }));

notes.get("/", (req, res) => {
    const currentNotes = JSON.parse(fs.readFileSync(dbPath));
    res.json(currentNotes);
  });

notes.post("/", (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  currentNotes.push(newNote);
  fs.writeFileSync("./db/db.json", JSON.stringify(currentNotes));
  res.json(newNote);
  console.info(`${req.method} request received`);
});

notes.delete("/:id", (req, res) => {
  const noteId = req.params.id;
  const currentNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  const updatedNotes = currentNotes.filter((note) => note.id !== noteId);
  fs.writeFileSync("./db/db.json", JSON.stringify(updatedNotes));
  res.json({ message: "Note deleted successfully" });
  console.info("Note deleted successfully");
});

module.exports = notes;
