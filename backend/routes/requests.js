const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// JSON file paths
const adoptionsFile = path.join(__dirname, "../data/adoptions.json");
const releasesFile = path.join(__dirname, "../data/releases.json");

// Helper functions
const readJSON = (filePath) =>
  new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data || "[]"));
    });
  });

const writeJSON = (filePath, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

// ADOPTIONS
// GET all adoptions
router.get("/adoptions", async (req, res) => {
  try {
    const data = await readJSON(adoptionsFile);
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new adoption
router.post("/adoptions", async (req, res) => {
  try {
    const { name, pet, email, phone, message } = req.body;
    if (!name || !pet || !email || !phone) 
      return res.status(400).json({ success: false, message: "All fields required" });

    const data = await readJSON(adoptionsFile);
    const newItem = { 
      id: data.length + 1, 
      name, 
      pet, 
      email,
      phone,
      message,
      status: "Submitted" 
    };
    data.push(newItem);
    await writeJSON(adoptionsFile, data);

    res.json({ success: true, request: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update adoption status
router.put("/adoptions/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;  // <-- accept new status
    if (!status) return res.status(400).json({ success: false, message: "Status is required" });

    const data = await readJSON(adoptionsFile);
    const item = data.find((i) => i.id === id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    item.status = status;  // <-- set new status
    await writeJSON(adoptionsFile, data);

    res.json({ success: true, request: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// RELEASES
// GET all releases
router.get("/releases", async (req, res) => {
  try {
    const data = await readJSON(releasesFile);
    res.json(data);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST new release
router.post("/releases", async (req, res) => {
  try {
    const { name, pet, type, age, reason } = req.body;
    if (!name || !pet || !type || !age) 
      return res.status(400).json({ success: false, message: "All fields required" });

    const data = await readJSON(releasesFile);
    const newItem = { 
      id: data.length + 1, 
      name, 
      pet,
      type,
      age,
      reason,
      status: "Submitted" 
    };
    data.push(newItem);
    await writeJSON(releasesFile, data);

    res.json({ success: true, request: newItem });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// PUT update release status
router.put("/releases/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status } = req.body;  // <-- accept new status
    if (!status) return res.status(400).json({ success: false, message: "Status is required" });

    const data = await readJSON(releasesFile);
    const item = data.find((i) => i.id === id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    item.status = status;  // <-- set new status
    await writeJSON(releasesFile, data);

    res.json({ success: true, request: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;