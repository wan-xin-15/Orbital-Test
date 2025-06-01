require("dotenv").config();
console.log({
  dbUser: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  hasPassword: !!process.env.DB_PASSWORD, // Should show 'true'
});
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./src/config/db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//connect to frontend
app.get("/getData", (req, res) => {
  res.send("");
});

//ROUTES//

//CREATE
app.post("/cafes", async (req, res) => {
  try {
    const { cafeName, cafeLocation } = req.body;
    console.log(req.body);
    const newCafe = await pool.query(
      "INSERT INTO cafes (cafeName, cafeLocation) VALUES (?, ?)",
      [cafeName, cafeLocation]
    );
    res.json("Café added");
  } catch (err) {
    console.error(err.message);
  }
});

//GET ALL
app.get("/cafes", async (req, res) => {
  try {
    const cafes = await pool.query("SELECT * FROM cafes");
    res.json(cafes[0]); //get idx 0 to not display buffering stuff
  } catch (err) {
    console.error(err.message);
  }
});

//GET
app.get("/cafes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cafes = await pool.query("SELECT * FROM cafes WHERE id = ?", [id]);
    res.json(cafes[0]); //get idx 0 to not display buffering stuff
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE
app.put("/cafes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { cafeName, cafeLocation } = req.body;

    const updateCafe = await pool.query(
      "UPDATE cafes SET cafeName = ?, cafeLocation = ? WHERE id = ?",
      [cafeName, cafeLocation, id]
    );
    res.json("Café was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE
app.delete("/cafes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCafe = await pool.query("DELETE FROM cafes WHERE id = ?", [id]);
    res.json("Café was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
