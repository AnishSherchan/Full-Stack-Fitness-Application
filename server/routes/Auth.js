// ?calling in all necessary libs for process
const router = require("express").Router();
const pool = require("../db");
// ? bcrypt fot password
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");

// ? Register
router.post("/register", validInfo, async (req, res) => {
  try {
    //? destructure req.body get name email password
    const { name, email, password } = req.body;
    //?  check user existes
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      //Here length is 1 if user exists and 0 if user doesn't
      return res.status(401).json("User already exists!");
      //We are returning user status 401 if user ecists
    }
    //?  if allcondtion are natched bcrypt user password
    //Here we are rounding how many times we are using salt
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    //?  insert user data
    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, user_role,account_status) VALUES ($1, $2, $3, 'user','Active') RETURNING *",
      [name, email, bcryptPassword]
    );
    // ? Generating jwttoken
    //here we get token return from jwtGenerator
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.log(err.message);
    res.status(5000).json("Server Error");
  }
});

// ?Login Route
router.post("/login", validInfo, async (req, res) => {
  try {
    //? destructure req.body
    const { email, password } = req.body;
    // ? Checking user's Email for verification
    const user = await pool.query(
      "SELECT * FROM users WHERE user_email = ($1)",
      [email]
    );
    //? Check if user doesn't exists if not we throw error
    if (user.rows.length == 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    //? if exixts Checking the user given password with db password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    // ? If not true throw error
    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }
    //? If all test are passed we provide user a token
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (err) {
    // ? handeling error
    console.log(err.message);
    res.status(5000).json("Server Error");
  }
});
// ? For checking user verfication
router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/admin", authorization, async (req, res) => {
  try {
    const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows[0].isadmin);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

router.get("/exercise", async (req, res) => {
  try {
    const Exercises = await pool.query("SELECT * FROM exercises");
    res.json(Exercises.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
