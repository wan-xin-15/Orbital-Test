require("dotenv").config();

// debugging
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

// CAFE ROUTE ---------
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

// LOGIN ROUTE
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");
const LocalStrategy = require("passport-local").Strategy;

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // won't resave session variable if nothing is changed
    saveUnintialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

initializePassport(
  passport,
  async (username) => await getUserByUsername(username)
);

// GET ALL USERS
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result[0]);
  } catch (err) {
    console.error(err);
    res.send("Error fetching data");
  }
});

//GET USER BY USERNAME
app.get("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const users = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (users[0].length == 0) {
      res.json("USER NOT FOUND");
    } else {
      res.json(users[0]);
    } //get idx 0 to not display buffering stuff}
  } catch (err) {
    console.error(err.message);
  }
});

//UPDATE USER DETAILS
app.put("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const { email, password } = req.body;

    const updateUsers = await pool.query(
      "UPDATE users SET email = ?, password = ? WHERE username = ?",
      [email, password, username]
    );
    if (!updateUsers.affectedRows) {
      res.json("USER NOT FOUND");
    }
    res.json("User was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//DELETE USER ACCOUNT
app.delete("/users/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const deleteUsers = await pool.query(
      "DELETE FROM users WHERE username = ?",
      [username]
    );

    if (!deleteUsers.affectedRows) {
      res.json("USER NOT FOUND");
    }
    res.json("User was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// HELPER FUNCTIONS
async function getUserByUsername(username) {
  const normalizedUsername = username.toLowerCase().trim();

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      normalizedUsername,
    ]);
    return rows[0] || null;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

async function getUserByEmail(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0] || null; // Return first user found or null
}

// NOT NEEDED
async function getUserById(id) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0] || null;
}

function initializePassport(passport, getUserByUsername) {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        // get users by username
        const user = await getUserByUsername(username);
        if (username == null) {
          return done(null, false, {
            message: "No user found with that username",
          });
        }

        try {
          if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Password Incorrect" });
          }
        } catch (e) {
          console.log(e);
          return done(e);
        }
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById);
  });
}

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
