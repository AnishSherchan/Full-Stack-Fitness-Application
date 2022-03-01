const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

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

module.exports = router;
