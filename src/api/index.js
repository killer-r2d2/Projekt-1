import express from "express";
import cors from "cors";
// import Datastore from "nedb";
import { todoRoutes } from "./routes/todo-routes.js";

const app = express();
const PORT = 5000;
("module");

app.use(cors()); // Use cors middleware
app.use(express.json()); // Use express built-in body parser

app.get("/", (req, res) => {
  res.send("The server is running!");
});

app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
