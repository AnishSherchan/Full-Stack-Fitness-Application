const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// ! User's info for admin
router.get("/users", authorization, async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users;");
    res.json(users.rows.length);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});
router.get("/userEmail", authorization, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT user_email FROM users WHERE user_id = ($1);",
      [req.user]
    );
    res.json(users.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});
// ? Admin List
router.get("/userRole", authorization, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT user_id as key, user_name as name, user_email as email FROM users WHERE user_role ='admin';"
    );
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});
// ? user Role update
router.put("/userRole", authorization, async (req, res) => {
  try {
    const { user_email, user_role } = req.body;
    const userRole = await pool.query(
      "UPDATE users SET user_role = ($1) WHERE user_email = ($2) RETURNING * ",
      [user_role, user_email]
    );
    res.json(userRole.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});
// ? User's Data for display
router.get("/usersdata", authorization, async (req, res) => {
  try {
    const users = await pool.query(
      "SELECT user_id as key, user_name as name, user_email as email, user_role as role, account_status as status from users;"
    );
    res.json(users.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! Plan
router.post("/plan", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const {
      plan_name,
      plan_duration,
      plan_type,
      health_condition,
      working_days,
      permium,
      url,
      genders,
      age_group,
    } = req.body;
    //?  insert user data
    let planinfo = await pool.query(
      "INSERT INTO plan (plan_name, plan_duration, plan_type, health_condition, working_days,permium,url,genders,age_group) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        plan_name,
        plan_duration,
        plan_type,
        health_condition,
        working_days,
        permium,
        url,
        genders,
        age_group,
      ]
    );
    res.json(planinfo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});
// ? Total Number for workout plan
router.get("/plan", authorization, async (req, res) => {
  try {
    const plan = await pool.query("SELECT * FROM plan;");
    res.json(plan.rows.length);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! Supplements
router.post("/supplement", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const {
      supplement_id,
      supplement_name,
      company,
      description,
      tips,
      energy,
      protein,
      carbs,
      fat,
      image_url,
    } = req.body;
    //?  insert user data
    let suppInfo = await pool.query(
      "INSERT INTO supplement (supplement_id,supplement_name,company,description,tips,energy,protein,carbs,fat,image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10) RETURNING *",
      [
        supplement_id,
        supplement_name,
        company,
        description,
        tips,
        energy,
        protein,
        carbs,
        fat,
        image_url,
      ]
    );
    res.json(suppInfo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});
// ? Total Number for Supplements
router.get("/supplement", authorization, async (req, res) => {
  try {
    const supplement = await pool.query("SELECT * FROM supplement;");
    res.json(supplement.rows.length);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

// ! Exercise
router.post("/exercise", authorization, async (req, res) => {
  try {
    //? destructure req.body
    const {
      ex_id,
      exercise_name,
      target_muscle,
      exercise_type,
      equipment_required,
      mechanics,
      force_type,
      url,
    } = req.body;
    //?  insert user data
    let exeInfo = await pool.query(
      "INSERT INTO exercises (ex_id,exercise_name,target_muscle,exercise_type,equipment_required,mechanics,force_type,url) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *",
      [
        ex_id,
        exercise_name,
        target_muscle,
        exercise_type,
        equipment_required,
        mechanics,
        force_type,
        url,
      ]
    );
    res.json(exeInfo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(5000).json("Server Error");
  }
});

// ? Total Number for Supplements
router.get("/exercise", authorization, async (req, res) => {
  try {
    const exercise = await pool.query("SELECT * FROM exercises;");
    res.json(exercise.rows.length);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
});

module.exports = router;
