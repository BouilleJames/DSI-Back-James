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

app.get("/medias", (req, res) => {
  const q = "SELECT * FROM medias";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/medias", (req, res) => {
  const reference_media = req.body.reference_media;
  const url = req.body.url;
  if (!reference_media) {
    res.status(400).json({ error: "La reference_media est obligatoire" });
    return;
  }
  if (!url) {
    res.status(400).json({ error: "L' url est obligatoire" });
    return;
  }

  app.put("/medias/:id", (req, res) => {
  const { reference_media, url } = req.body;
  const id_media = req.params.id;
  db.query(
    "UPDATE medias SET reference_media = ?, url = ? WHERE id_media = ?",
    [reference_media, url, id_media],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Média modifié avec succès" });
      }
    }
  );
});

app.patch("/medias/:id/:value", (req, res) => {
  const id_media = req.params.id;
  let value = {};
  if (req.params.value === "reference_media") {
    value = req.body.reference_media;
    reqSql = "UPDATE medias SET reference_media = ? WHERE id_media = ?";
  } else if (req.params.value === "url") {
    value = req.body.url;
    reqSql = "UPDATE medias SET url = ? WHERE id_media = ?";
  } else {
    console.error("error");
  }

  app.delete("/medias/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM user WHERE user_id = ?", [id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).send("média non trouvé");
      } else {
        res.status(200).json({ message: "média supprimé avec succès" });
      }
    });
  });

  db.query(
    "INSERT INTO medias(reference_media, url) VALUES(?, ?)",
    [reference_media, url],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Media créé avec succès" });
      }
    }
  );
});

app.get("/articles", (req, res) => {
  const q = "SELECT * FROM articles";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/articles", (req, res) => {
  const titre = req.body.titre;
  const content = req.body.content;
  const date_publication = req.body.date_publication;
  if (!titre) {
    res.status(400).json({ error: "Le titre est obligatoire" });
    return;
  }
  if (!content) {
    res.status(400).json({ error: "Le contenu est obligatoire" });
    return;
  }
  if (!date_publication) {
    res.status(400).json({ error: "La date de publication est obligatoire" });
    return;
  }

  app.put("/articles/:id", (req, res) => {
  const { titre, content, date_publication } = req.body;
  const id_article = req.params.id;
  db.query(
    "UPDATE articles SET titre = ?, content = ?, date_publication = ? WHERE id_article = ?",
    [titre, content, date_publication, id_article],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Article modifié avec succès" });
      }
    }
  );
});

app.patch("/Articles/:id/:value", (req, res) => {
  const id_article = req.params.id;
  let value = {};
  if (req.params.value === "titre") {
    value = req.body.titre;
    reqSql = "UPDATE articles SET titre = ? WHERE id_article = ?";
  } else if (req.params.value === "content") {
    value = req.body.content;
    reqSql = "UPDATE articles SET content = ? WHERE id_article = ?";
  } else if (req.params.value === "date_publication") {
    value = req.body.date_publication;
    reqSql = "UPDATE articles SET date_publication = ? WHERE id_article = ?";
    } else {
    console.error("error");
  }

  app.delete("/articles/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM articles WHERE id_article = ?", [id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0) {
        res.status(404).send("article non trouvé");
      } else {
        res.status(200).json({ message: "article supprimé avec succès" });
      }
    });
  });

  db.query(
    "INSERT INTO articles(titre, content, date_publication) VALUES(?, ?)",
    [titre, content, date_publication, id_article],
    (error, data) => {
      if (error) {
        console.error(error);
        res.status(500).send("Erreur du serveur");
      } else {
        res.status(201).json({ message: "Article créé avec succès" });
      }
    }
  );
});

app.listen(3004, () => {
  console.log("🎉Server is running on port 3004");
});
