if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// import libraries installed using npm
const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const cors = require("cors"); // to access apis
const bcrypt = require("bcrypt"); // importing bcrypt package
const passport = require("passport")
const initializePassport = require("./passport-config")
const flash = require("express-flash")
const session = require("express-session") 
const methodOverride = require("method-override")

app.use(cors());
// store connections to mysql
const db = mysql.createPool({
  user: "root",
  password: password,
  host: "localhost",
  port: port,
  database: db,
});

initializePassport(
    passport, 
    email => db.find(user => user.email === email),
    id => db.find(user => user.id === id)
)

// fetching users from database
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.send('Error fetching data');
  }
});

app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // won't resave session variable if nothing is changed
    saveUnintialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

// login
app.post("/login", checkNotAuthenticated, passport.authenticate("local", { 
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true, // show error messages
}))

// create account, configuring register post functionality
app.post("register", checkNotAuthenticated, async (req, res) => { // async for try-catch
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })
        res.redirect("/login")
    } catch (e) {
        console.log(e);
        res.redirect("/register")
    }
})

// routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index.js", {name: req.user.username})
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.redner("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})
// end routes

app.delete("/logout", (req, res) => {
    req.logOut(req.user, err => {
        if (err) return next(err)
        res.redirect("/")
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()){
        res.redirect("/login")
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}
console.log(users); // display newly registered in the console
app.listen(5002, () => {
    console.log("listening...");
})