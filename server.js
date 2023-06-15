const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  content: "root",
  database: "dsimed",
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/articles", (req, res) => {
  const q = "SELECT * FROM articles";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/articles", (req, res) => {
  const author = req.body.author;
  const content = req.body.content;
  if (!author) {
    res.status(400).json({ error: "L'auteur est obligatoire" });
    return;
  }
  if (!content) {
    res.status(400).json({ error: "Le message est obligatoire" });
    return;
  }

  db.query(
    "INSERT INTO articles(author, content) VALUES(?, ?)",
    [author, content],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "message créé avec succès" });
      }
    }
  );
});

app.put("/articles/", (req, res) => {
  const author = req.body.author;
  const content = req.body.content;
  console.log(content);
  connection.query(
    "UPDATE articles SET content = ? WHERE author = ?;",
    [content, author],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.patch("/articles/", (req, res) => {
  const author = req.body.author;
  const content = req.body.content;
  console.log(content);
  connection.query(
    "UPDATE articles SET content = ? WHERE author = ?;",
    [content, author],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

app.delete("/articles/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM articles WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      res.status(404).send("articles non trouvé");
    } else {
      res.status(200).json({ message: "articles supprimé avec succès" });
    }
  });
});

app.listen(3004, () => {
  console.log("🎉Server is running on port 3004");
});
