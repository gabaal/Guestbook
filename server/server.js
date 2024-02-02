import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const db = new Database("database.db");
const PORT = "4321"
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.json("root route");
});

app.get("/messages", (req, res) => {
  try {
    if (req.query.id) {
      let message = db.prepare(`SELECT * FROM messages WHERE id = ?`).all(req.query.id);
      res.status(200).json(message)
      return;
    }
    let messages = db.prepare(`SELECT * FROM messages`).all();
    res.status(200).json(messages);
  }catch (err) {
    res.status(500).json(err);
  }
})


// app.get("/messages", function (request, response) {
//   let messages = [];
//    if (request.query.id) {
//     messages = db
//       .prepare(`SELECT * FROM messages WHERE id=${request.query.id}`)
//       .all();
//   } else {
//     messages = db.prepare("SELECT * FROM messages").all();
//   }
//   response.json(messages);
// });



app.post("/messages", function (request, response) {
  console.log(request.body);
  const message = request.body.message;

  const newMessage = db
    .prepare(`INSERT INTO messages (message) VALUES (?)`)
    .run(message);

  response.json(newMessage);
});

app.listen(PORT, function () {
  console.log(`Server started on PORT: ${PORT} `);
});