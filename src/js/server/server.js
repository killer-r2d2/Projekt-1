import express from "express";
import cors from "cors";
import Datastore from "nedb";

const app = express();
const PORT = 5000;
("module");
let db = new Datastore({
  filename: "./src/data/database.db",
  autoload: true,
});

app.use(cors()); // Use cors middleware
app.use(express.json()); // Use express built-in body parser

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET endpoints to get all todos and a single todo by id.
app.get("/api/todos", (req, res) => {
  db.find({}, (err, todos) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(todos);
    }
  });
});
// POST endpoint to create a new todo
app.post("/api/todos", (req, res) => {
  const todo = req.body;
  db.insert(todo, (err, newTodo) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json(newTodo);
    }
  });
});

// DELETE endpoint to delete a todo
app.delete("/api/todos/:id", (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.json({ success: true });
    }
  });
});

// PUT endpoint to update a todo
app.put("/api/todos/:id", (req, res) => {
  db.update({ _id: req.params.id }, req.body, {}, (err, numReplaced) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      db.findOne({ _id: req.params.id }, (err, updatedTodo) => {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else {
          res.json(updatedTodo);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
