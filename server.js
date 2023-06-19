const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dsimed",
});

app.get("/", (req, res) => {
  res.json("hello this is the backend");
});

app.get("/user", (req, res) => {
  const q = "SELECT * FROM user";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/user", (req, res) => {
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const mot_de_passe = req.body.mot_de_passe;
  const mail = req.body.mail;
  const roles = req.body.roles;
  if (!nom) {
    res.status(400).json({ error: "Le nom est obligatoire" });
    return;
  }
  if (!prenom) {
    res.status(400).json({ error: "Le prenom est obligatoire" });
    return;
  }
  if (!mot_de_passe) {
    res.status(400).json({ error: "Le mot de passe est obligatoire" });
    return;
  }
  if (!mail) {
    res.status(400).json({ error: "Le mail est obligatoire" });
    return;
  }
  if (!roles) {
    res.status(400).json({ error: "Le role est obligatoire" });
    return;
  }
  db.query(
    "INSERT INTO user(nom, prenom, mot_de_passe, mail, roles) VALUES(?, ?, ?, ?, ?)",
    [nom, prenom, mot_de_passe, mail, roles],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Utilisateur créé avec succès" });
      }
    }
  );
});

app.put("/user/:id", (req, res) => {
  const { nom, prenom, mot_de_passe, mail, roles } = req.body;
  const user_id = req.params.id;
  db.query(
    "UPDATE user SET nom = ?, prenom = ?, mot_de_passe = ?, mail = ?, roles = ? WHERE user_id = ?",
    [nom, prenom, mot_de_passe, mail, roles, user_id],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "User modifié avec succès" });
      }
    }
  );
});

app.patch("/user/:id/:value", (req, res) => {
  const user_id = req.params.id;
  let value = {};
  if (req.params.value === "nom") {
    value = req.body.nom;
    reqSql = "UPDATE user SET nom = ? WHERE user_id = ?";
  } else if (req.params.value === "prenom") {
    value = req.body.prenom;
    reqSql = "UPDATE user SET prenom = ? WHERE user_id = ?";
  } else if (req.params.value === "mot_de_passe") {
    value = req.body.mot_de_passe;
    reqSql = "UPDATE user SET mot_de_passe = ? WHERE user_id = ?";
  } else if (req.params.value === "mail") {
    value = req.body.mail;
    reqSql = "UPDATE user SET mail = ? WHERE user_id = ?";
  } else if (req.params.value === "roles") {
    value = req.body.roles;
    reqSql = "UPDATE user SET roles = ? WHERE user_id = ?";
  } else {
    console.error("error");
  }
  db.query(reqSql, [value, user_id], (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).send("Erreur du serveur");
    } else {
      res.status(201).json({ message: "Utilisateur modifié avec succès" });
    }
  });
});

app.delete("/user/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM user WHERE user_id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.affectedRows === 0) {
      res.status(404).send("user non trouvé");
    } else {
      res.status(200).json({ message: "user supprimé avec succès" });
    }
  });
});

app.listen(3004, () => {
  console.log("🎉Server is running on port 3004");
});
