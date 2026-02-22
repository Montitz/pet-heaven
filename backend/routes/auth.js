const express = require("express");
const router = express.Router();
const session = require("express-session");

// Hard-coded demo user
const USER = { username: "petheaven", password: "demo123" };

// Session setup
router.use(session({
  secret: "petheavenSecret",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // true if HTTPS in production
}));

// Login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === USER.username && password === USER.password) {
    req.session.user = { username };
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Logout route (POST now!)
router.post("/logout", (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

// Check session route
router.get("/check-session", (req, res) => {
  if (req.session.user) res.json({ loggedIn: true });
  else res.json({ loggedIn: false });
});

module.exports = router;