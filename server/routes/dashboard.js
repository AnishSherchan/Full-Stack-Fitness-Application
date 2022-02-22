const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

router.get("/userinfo", authorization, async (req, res) => {
  try {
    const userinfo = await pool.query(
      "SELECT * FROM user_info WHERE user_id = $1",
      [req.user]
    );
    res.json(userinfo.rows.length);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

router.post("/userinfo", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const { gender, dob, weight, height, goal } = req.body;
    const user_id = req.user;
    //?  insert user data
    let newUserInfo = await pool.query(
      "INSERT INTO user_info (user_id, gender, dob, weight, height, goal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, gender, dob, weight, height, goal]
    );
    res.json(newUserInfo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});
module.exports = router;
