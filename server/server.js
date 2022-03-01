const express = require("express");
const app = express();
const cors = require("cors");

// ? middlewares
app.use(express.json());
app.use(cors());

// ? Routes for API
app.use("/auth", require("./routes/Auth"));
app.use("/dashboard", require("./routes/dashboard"));
app.use("/admin", require("./routes/admin"));
// ?Server at 5000
app.listen(5000, () => {
  console.log("Hello on!");
});
