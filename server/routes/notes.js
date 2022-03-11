const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/notes", authorization, async (req, res) => {
  try {
    const { notes } = req.body;
    const user_id = req.user;
    const newNotes = await pool.query(
      "INSERT INTO user_notes (notes, user_id) VALUES ($1, $2) RETURNING *",
      [notes, user_id]
    );
    res.json(newNotes.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
// Get all notes
router.get("/notes", authorization, async (req, res) => {
  try {
    const AllNotes = await pool.query(
      "SELECT * FROM user_notes WHERE user_id = $1",
      [req.user]
    );
    res.json(AllNotes.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Get a user_notes
router.get("/notes/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const Atodo = await pool.query(
      "SELECT * FROM user_notes WHERE note_id = ($1)",
      [id]
    );
    res.json(Atodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// Update a user_notes
router.put("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const UpTodo = await pool.query(
      "UPDATE user_notes SET notes = ($1) WHERE note_id = ($2) RETURNING * ",
      [notes, id]
    );
    res.json(UpTodo.rows);
  } catch (err) {
    console.log(err.message);
  }
});
// Delete a user_notes
router.delete("/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const DelTodo = await pool.query(
      "DELETE FROM user_notes WHERE note_id = ($1)",
      [id]
    );
    res.json(DelTodo);
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
