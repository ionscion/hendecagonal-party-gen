const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3001;
// const notes = require("./Develop/public")

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
  });


app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
